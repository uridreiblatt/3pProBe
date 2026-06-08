import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { DataSource } from 'typeorm';
import { CreateAiDto } from './dto/create-ai.dto';
import { ConfigService } from '@nestjs/config';
import { dbSchemaForUi } from './entities/dbSchema';
import { dbSchemaForUiRma } from './entities/dbSchemaRma';

@Injectable()
export class AiService {
  private readonly openAiKey: string;
  private openai: OpenAI;

  tables = ['order', 'products', 'returns', 'rma', 'grv', 'good_receives'];
  constructor(
    private readonly dataSource: DataSource,
    private configService: ConfigService,
  ) {
    this.openAiKey = this.configService.get<string>('OPENAI_KEY');
    this.openai = new OpenAI({
      apiKey: this.openAiKey,
    });
  }

  async askDatabase(createAiDto: CreateAiDto) {
    // const sqlResultSCH = await this.dataSource.query(
    //   //   `
    //   //       SELECT
    //   //     TABLE_NAME,
    //   //     COLUMN_NAME
    //   // FROM information_schema.columns
    //   // WHERE table_schema = 'p3pro'
    //   // and TABLE_NAME not like 'v_%'
    //   // and TABLE_NAME not in ('log','deliverysetting','company','cylinder')
    //   // and COLUMN_NAME not in ('is_active','created_at','updated_at')
    //   // ORDER BY TABLE_NAME, ORDINAL_POSITION
    //   //       `,

    //   `
    //     SELECT
    //     kcu.TABLE_NAME,
    //     kcu.COLUMN_NAME,
    //     kcu.REFERENCED_TABLE_NAME,
    //     kcu.REFERENCED_COLUMN_NAME
    // FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    // WHERE kcu.TABLE_SCHEMA = DATABASE()
    //   AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;`,
    // );
    // const relations = sqlResultSCH.map((row) => ({
    //   fromTable: row.TABLE_NAME,
    //   fromColumn: row.COLUMN_NAME,
    //   toTable: row.REFERENCED_TABLE_NAME,
    //   toColumn: row.REFERENCED_COLUMN_NAME,
    // }));

    // return relations;

    // const schema = Object.values(
    //   sqlResultSCH.reduce(
    //     (acc, row) => {
    //       if (!acc[row.TABLE_NAME]) {
    //         acc[row.TABLE_NAME] = {
    //           table: row.TABLE_NAME,
    //           fields: [] as string[],
    //         };
    //       }

    //       acc[row.TABLE_NAME].fields.push(row.COLUMN_NAME);

    //       return acc;
    //     },
    //     {} as Record<string, { table: string; fields: string[] }>,
    //   ),
    // );
    // return schema;

    const aiQuery = await this.openai.responses.create({
      model: 'gpt-5.4-mini',
      input: [
        {
          role: 'system',
          content: `
    You are a MySQL query generator.

 Rules:
- Return ONLY a SQL query.
- Generate ONLY SELECT statements.
- Never use INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE.
- Use only tables and columns from the provided schema.
- Use JOINs only from the provided relations.
- If the user asks about RMA, use all_rma as the main table.
- If the user asks about RMA items/products/parts, join task_rma to all_rma using task_rma.allRmaId = all_rma.id.
- If the user asks for status names, join all_rma.taskStatusId = task_status.id.
- If the user asks for users, join all_rma.userId = user.id.
- If the user asks for “insights”, generate an aggregate query using COUNT, GROUP BY, and ORDER BY.
- Return AMBIGUOUS_REQUEST only when there is no reasonable default table or metric.
- Limit results to 100 rows unless the user explicitly asks otherwise.

Schema:
${JSON.stringify(dbSchemaForUiRma)}

`,
        },
        {
          role: 'user',
          content: createAiDto.question,
        },
      ],
    });

    //return aiQuery.output_text;

    // const querySql = await this.detectTable(
    //   createAiDto.question,
    //   createAiDto.companyId,
    // );

    const sqlResult = await this.dataSource.query(
      aiQuery.output_text,
      //querySql.params,
    );

    const excludedColumns = new Set([
      'id',
      'userId',
      'rma_id',
      'companyId',
      'roleId',
      'taskStatusId',
      'taskTypeId',
      'allRmaId',
      'orderId',
      'zoneId',
      'priorityProductsId',
      'usersId',
      'updatedBy',
    ]);

    const sanitizedResult = sqlResult.map((row) =>
      Object.fromEntries(
        Object.entries(row).filter(([key]) => !excludedColumns.has(key)),
      ),
    );

    console.log('SQL Result:', sanitizedResult);
    console.log('SQL Result:', sqlResult);

    // const response = await this.openai.responses.create({
    //   model: 'gpt-5.4-mini',
    //   input: createAiDto.question,
    // });

    //return response.output_text;

    //return sqlResult;

    const ai = await this.openai.responses.create({
      model: 'gpt-5.4-mini',
      input: [
        {
          role: 'system',
          content: `
    Return ONLY valid JSON in this shape:
    {
      "answer": "string",
      "chart": {
        "type": "bar",
        "title": "string",
        "xKey": "name",
        "yKey": "total_sold",
        "data": []
      },
      "table": {
        "columns": [],
        "rows": []
      }
    }
              `,
        },
        {
          role: 'user',
          content: `
    Question: ${createAiDto.question}

    MySQL result:
    ${JSON.stringify(sanitizedResult)}
              `,
        },
      ],
    });

    return JSON.parse(ai.output_text);
  }

  async detectTable(question: string, companyId: string) {
    const q = question.toLowerCase();

    if (q.includes('return') || q.includes('refund') || q.includes('rma')) {
      return {
        sql: `
        SELECT r.CUSTDES, r.FBCM_RETREASONCODE
        FROM p3pro.all_rma r
        WHERE r.companyId = ?
        LIMIT 5
      `,
        params: [companyId],
      };
    }

    if (q.includes('product') || q.includes('sku') || q.includes('stock')) {
      return {
        sql: `
        SELECT p.PARTNAME,p.TYPE  , sum(pl.quantity) as quantity
        FROM p3pro.priorityproducts p, p3pro.priorityproductslocation pl
        where  p.companyId =?
        and pl.priorityProductsId=p.id
        group by p.PARTNAME,p.TYPE 
        having sum(pl.quantity) > 0
        limit 5
      `,
        params: [companyId],
      };
    }

    if (
      q.includes('receive') ||
      q.includes('received') ||
      q.includes('goods')
    ) {
      return {
        sql: `
        SELECT r.PO, r.taskInfo, as quantity
        FROM p3pro.all_grv r
        WHERE r.companyId = ?
        LIMIT 5
      `,
        params: [companyId],
      };
    }

    return {
      sql: `
        SELECT 
      *
      FROM p3pro.order o
      JOIN p3pro.order_line ol ON ol.orderId = o.id
      WHERE o.comapnyId = ?    
      LIMIT 10 
      
    `,
      // SELECT
      //   o.CUSTNAME,
      //   ol.PARTNAME,
      //   SUM(ol.TBALANCE) AS total_sold
      // FROM p3pro.order o
      // JOIN p3pro.order_line ol ON ol.orderId = o.id
      // WHERE o.comapnyId = ?
      // GROUP BY o.CUSTNAME, ol.PARTNAME
      // LIMIT 2
      params: [companyId],
    };
  }
}
