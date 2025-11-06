import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Log } from 'src/db-log/entities/db-log.entity';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async logError(error: any, request: Request) {
    try {
      const errorLog = new Log();
      errorLog.subject= JSON.stringify( {rbody: request.body,});
      errorLog.level = 'error';
      errorLog.companyId = 5;
      errorLog.message = error.message || 'Unknown error';
      errorLog.context = `Request: ${request.method} ${request.url}`;
      errorLog.metadata = JSON.stringify( {
        //body: request.body,
        //query: request.query,
        //params: request.params,
        stack: error.stack,
      }).substring(0,1500);    

      await this.logRepository.save(errorLog);
    } catch (dbError) {
      console.error('Failed to save error log to database:', dbError);
      error.stack
    }
  }
}