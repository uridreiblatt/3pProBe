import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { DataSource } from 'typeorm';
import { CreateAiDto } from './dto/create-ai.dto';
import { dbSchemaForUiRma } from './entities/dbSchemaRma';

@Injectable()
export class GeminiService {
  private readonly aiGoogleGenAI: GoogleGenAI;
  private readonly model: string;

  constructor(
    private readonly config: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }

    this.aiGoogleGenAI = new GoogleGenAI({ apiKey });
    this.model = this.config.get<string>('GEMINI_MODEL') || 'gemini-2.5-flash';
  }

  async generateText(createAiDto: CreateAiDto): Promise<string> {
    try {
      const response = await this.aiGoogleGenAI.models.generateContent({
        model: this.model,
        contents: createAiDto.question,
      });

      return response.text ?? '';
    } catch (error) {
      throw new InternalServerErrorException('Gemini request failed');
    }
  }
  async askDatabase(createAiDto: CreateAiDto) {
    try {
      const aiQuery = await this.aiGoogleGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: createAiDto.question,
        config: {
          temperature: 0,
          systemInstruction: `
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
- Limit results to 20 rows unless the user explicitly asks otherwise.

Schema:
${JSON.stringify(dbSchemaForUiRma)}
        `,
        },
      });

      const sql = aiQuery.text?.trim();

      if (!sql || sql === 'AMBIGUOUS_REQUEST') {
        throw new Error('AMBIGUOUS_REQUEST');
      }

      if (!/^select\s/i.test(sql)) {
        throw new Error('Unsafe SQL generated');
      }

      const forbidden =
        /\b(insert|update|delete|drop|alter|create|truncate)\b/i;
      if (forbidden.test(sql)) {
        throw new Error('Unsafe SQL generated');
      }

      const sqlResult = await this.dataSource.query(sql);

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

      const ai = await this.aiGoogleGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
Question: ${createAiDto.question}

MySQL result:
${JSON.stringify(sanitizedResult)}
      `,
        config: {
          temperature: 0,
          responseMimeType: 'application/json',
          systemInstruction: `
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
      });

      return JSON.parse(ai.text ?? '{}');
    } catch (error: any) {
      console.error('Error in askDatabase:', error);

      if (error?.status === 429 || error?.response?.status === 429) {
        throw new HttpException(
          'Too many account requests, please check your Gemini quota.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      throw new Error(
        'The AI response was not in the expected format. Please try rephrasing your question or ask a simpler one.',
      );
    }
  }
}
