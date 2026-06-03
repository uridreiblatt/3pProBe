import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { DataSource } from 'typeorm';
import { CreateAiDto } from './dto/create-ai.dto';
import { ConfigService } from '@nestjs/config';

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
    const querySql = await this.detectTable(
      createAiDto.question,
      createAiDto.companyId,
    );

    const sqlResult = await this.dataSource.query(
      querySql.sql,
      querySql.params,
    );

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
        "xKey": "CUSTNAME",
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
    ${JSON.stringify(sqlResult)}
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
        SELECT r.CUSTNAME, r.FBCM_RETREASONCODE
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
        SELECT p.BARCODE,p.TYPE  , sum(pl.quantity) as quantity
        FROM p3pro.priorityproducts p, p3pro.priorityproductslocation pl
        where  p.companyId =?
        and pl.priorityProductsId=p.id
        group by p.BARCODE,p.TYPE 
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
        SELECT r.PO, r.taskInfo
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
        o.CUSTNAME,
        ol.PARTNAME,
        SUM(ol.TBALANCE) AS total_sold
      FROM p3pro.order o
      JOIN p3pro.order_line ol ON ol.orderId = o.id
      WHERE o.comapnyId = ?
      GROUP BY o.CUSTNAME, ol.PARTNAME
      LIMIT 2
    `,
      params: [companyId],
    };
  }
}
