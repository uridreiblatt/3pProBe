import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { DataSource } from 'typeorm';
import { CreateAiDto } from './dto/create-ai.dto';
import { dbSchemaForUi, rmaSql } from './entities/dbSchemaRma';

type SqlAiResponse = {
  sql: string;
};

// type AiAnswerResponse = {
//   answer: string;
//   chart?: {
//     type: 'bar' | 'line' | 'table' | 'none';
//     title: string;
//     xKey: string;
//     yKey: string;
//     data?: any[];
//   };
// };
type AiAnswerResponse = {
  answer: string;
  fields: string[];
  data: Record<string, any>[];
  chart?: {
    title: string;
    xKey: string;
    yKey: string;
    data: Record<string, any>[];
  };
};

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private readonly aiGoogleGenAI: GoogleGenAI;
  private readonly model: string;

  private readonly excludedColumns = new Set([
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
    'userPasswordEnc',
    'otp',
  ]);

  constructor(
    private readonly config: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }

    this.aiGoogleGenAI = new GoogleGenAI({ apiKey });
    this.model =
      this.config.get<string>('GEMINI_MODEL') || 'gemini-3.1-flash-lite';
  }
  private pickFields(
    rows: Record<string, any>[],
    fields: string[],
  ): Record<string, any>[] {
    if (!rows.length || !fields.length) {
      return [];
    }

    return rows.map((row) =>
      Object.fromEntries(fields.map((field) => [field, row[field]])),
    );
  }

  async generateText(createAiDto: CreateAiDto): Promise<string> {
    try {
      const response = await this.generateGeminiWithRetry({
        model: this.model,
        contents: createAiDto.question,
      });

      return response.text ?? '';
    } catch (error) {
      this.logger.error('generateText failed', error);
      throw new InternalServerErrorException('Gemini request failed');
    }
  }

  async askDatabase(createAiDto: CreateAiDto): Promise<any> {
    try {
      const question = createAiDto.question?.trim();

      if (!question) {
        throw new BadRequestException('Question is required.');
      }

      //const sql = await this.generateSql(question);

      // if (!sql || sql === 'AMBIGUOUS_REQUEST') {
      //   throw new BadRequestException(
      //     'Please provide a more specific question.',
      //   );
      // }

      //this.validateSql(sql);

      const finalSql = this.ensureLimit(rmaSql, 100);
      const rows = await this.dataSource.query(finalSql);
      const sanitizedRows = this.sanitizeRows(rows);
      const answer = await this.generateAnswer(question, sanitizedRows);
      return { ...answer };
    } catch (error: any) {
      this.logger.error('askDatabase failed', error);

      if (this.isRateLimitError(error)) {
        throw new HttpException(
          'Gemini quota exceeded. Please try again shortly.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        'Unable to answer the question. Please try rephrasing it.',
      );
    }
  }

  private async generateSql(question: string): Promise<string> {
    const response = await this.generateGeminiWithRetry({
      model: this.model,
      contents: question,
      config: {
        temperature: 0,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            sql: { type: 'string' },
          },
          required: ['sql'],
        },
        systemInstruction: this.getSqlSystemPrompt(),
      },
    });

    const parsed = this.safeJsonParse<SqlAiResponse>(response.text);

    return parsed?.sql?.trim() ?? '';
  }

  private async generateAnswer(
    question: string,
    rows: Record<string, any>[],
  ): Promise<AiAnswerResponse> {
    const response = await this.generateGeminiWithRetry({
      model: this.model,
      contents: JSON.stringify({
        question,
        data: rows,
      }),
      config: {
        temperature: 0,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            answer: { type: 'string' },
            fields: {
              type: 'array',
              items: { type: 'string' },
            },
            groupBy: {
              type: 'string',
            },
            chartTitle: {
              type: 'string',
            },
          },
          required: ['answer', 'fields'],
        },
        systemInstruction: `
Return ONLY valid JSON.

Shape:
{
  "answer": "string",
  "fields": ["fieldName"],
  "groupBy": "fieldName",
  "chartTitle": "Chart title"
}

Rules:
- Use the provided MySQL rows only.
- Do not invent data.
- If rows are empty, return:
  {
    "answer": "No matching records were found.",
    "fields": []
  }
- fields must contain only field names that exist in the provided rows.
- Select only fields relevant to the user's question.
- For totals, summaries, rankings, distributions, counts and trends:
  - choose a groupBy field.
  - provide a clear chartTitle.
- groupBy must be one of the existing fields.
- If no grouping is needed, omit groupBy and chartTitle.
- Do NOT return row data.
- Backend will attach filtered or grouped row data.
      `,
      },
    });

    const parsed = this.safeJsonParse<{
      answer: string;
      fields: string[];
      groupBy?: string;
      chartTitle?: string;
    }>(response.text);

    if (!parsed?.answer || !Array.isArray(parsed.fields)) {
      throw new Error('Invalid Gemini answer JSON');
    }

    const existingFields = rows.length ? Object.keys(rows[0]) : [];

    const fields = parsed.fields.filter((field) =>
      existingFields.includes(field),
    );

    const groupBy =
      parsed.groupBy && existingFields.includes(parsed.groupBy)
        ? parsed.groupBy
        : undefined;

    if (!rows.length) {
      return {
        answer: parsed.answer,
        fields: [],
        data: [],
      };
    }

    if (groupBy) {
      const groupedData = Object.values(
        rows.reduce(
          (acc, row) => {
            const key = String(row[groupBy] ?? 'Unknown');

            if (!acc[key]) {
              acc[key] = {
                [groupBy]: key,
                count: 0,
              };
            }

            acc[key].count += 1;

            return acc;
          },
          {} as Record<string, Record<string, any>>,
        ),
      ).sort((a, b) => Number(b.count) - Number(a.count));

      return {
        answer: parsed.answer,
        fields: [groupBy, 'count'],
        data: groupedData,
        chart: {
          title: parsed.chartTitle || '',
          xKey: groupBy,
          yKey: 'count',
          data: groupedData,
        },
      };
    }

    const filteredData = this.pickFields(rows, fields);

    return {
      answer: parsed.answer,
      fields,
      data: filteredData,
    };
  }

  private getSqlSystemPrompt(): string {
    return `
You are a safe MySQL SELECT query generator for an internal analytics system.

Return ONLY valid JSON:
{
  "sql": "SELECT ..."
}

Rules:
- Generate ONLY SELECT queries.
- Never generate INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE.
- Never return multiple SQL statements.
- Use only the provided tables, columns, and relations.
- Default LIMIT 10 unless the user explicitly asks otherwise.
- Use COUNT and GROUP BY for totals, summaries, rankings, and trends.
- Use ORDER BY for top, bottom, latest, oldest, most, least.
- Return {"sql":"AMBIGUOUS_REQUEST"} only when no safe default exists.

Domain rules:
- RMA questions: use all_rma as the main table.
- RMA items/products/parts: join task_rma to all_rma using task_rma.allRmaId = all_rma.id.
- RMA status names: join all_rma.taskStatusId = task_status.id.
- RMA users/owners: join all_rma.userId = user.id.
- Product questions: use priorityproducts as the main table.
- Product stock/location/inventory: use priorityproductslocation joined to priorityproducts.
- Product hierarchy/BOM/children/parents: use priorityproductshierarchy joined to priorityproducts.
- Order questions: use orders as the main table if present in schema.
- GRV questions: use grv as the main table if present in schema.

Date rules:
- For RMA dates, use all_rma.CURDATE.
- For product stock dates, use priorityproductslocation.stockDate.
- Convert "today", "this month", "last month", and "this year" into MySQL date filters.

Schema:
${JSON.stringify(dbSchemaForUi)}
    `;
  }

  private validateSql(sql: string): void {
    const normalized = sql.trim();

    if (!/^select\s/i.test(normalized)) {
      throw new Error('Only SELECT queries are allowed');
    }

    if (normalized.includes(';')) {
      throw new Error('Multiple SQL statements are not allowed');
    }

    const forbidden =
      /\b(insert|update|delete|drop|alter|create|truncate|grant|revoke|replace|call|execute)\b/i;

    if (forbidden.test(normalized)) {
      throw new Error('Forbidden SQL detected');
    }

    const blockedSchemas =
      /\b(information_schema|mysql|performance_schema|sys)\b/i;

    if (blockedSchemas.test(normalized)) {
      throw new Error('System schema access is not allowed');
    }
  }

  private ensureLimit(sql: string, limit = 10): string {
    if (/\blimit\s+\d+\b/i.test(sql)) {
      return sql;
    }

    return `${sql} LIMIT ${limit}`;
  }

  private sanitizeRows(rows: Record<string, any>[]): Record<string, any>[] {
    return rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).filter(([key]) => !this.excludedColumns.has(key)),
      ),
    );
  }

  private async generateGeminiWithRetry(payload: any, maxRetries = 3) {
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.aiGoogleGenAI.models.generateContent(payload);
      } catch (error: any) {
        lastError = error;

        if (!this.isRateLimitError(error) || attempt === maxRetries) {
          throw error;
        }

        const delayMs =
          this.getRetryDelayMs(error) ?? Math.min(1000 * 2 ** attempt, 8000);

        await this.sleep(delayMs);
      }
    }

    throw lastError;
  }

  private isRateLimitError(error: any): boolean {
    return (
      error?.status === 429 ||
      error?.response?.status === 429 ||
      error?.error?.status === 'RESOURCE_EXHAUSTED' ||
      error?.message?.includes('RESOURCE_EXHAUSTED')
    );
  }

  private getRetryDelayMs(error: any): number | null {
    const text = JSON.stringify(error);
    const match = text.match(/retry in ([\d.]+)s/i);

    if (!match) return null;

    return Math.ceil(Number(match[1]) * 1000);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private safeJsonParse<T>(text?: string): T | null {
    try {
      return JSON.parse(text ?? '{}') as T;
    } catch {
      return null;
    }
  }
}
