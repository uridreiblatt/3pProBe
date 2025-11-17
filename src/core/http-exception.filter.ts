import { Catch, ArgumentsHost, Logger, HttpStatus, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorLogService } from './error-log.service';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(
    httpAdapterHost: HttpAdapterHost, // This is correct
    private readonly errorLogService: ErrorLogService,
  ) {
    super(httpAdapterHost.httpAdapter); // ✅ Use .httpAdapter to get HttpServer
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Determine status code and message
    let status = 500;
    let message = 'Internal server error';
    let errorDetails: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      errorDetails = exception.getResponse();
    } else if (exception instanceof Error) {
      message = exception.message;
    }
    else if (exception instanceof QueryFailedError) {
      const drv: any = (exception as any).driverError || {};      
      status = 401;
      message = (exception as any).driverError;
      errorDetails = drv.code || drv.errno || drv.name;;
        
      }


    this.logger.error(
      `Request failed: ${request.method} ${request.url}`,
      JSON.stringify({
        body: request.body,
        error: exception,
      }),
    );

    // Save error to database
    this.errorLogService.logError(exception, request);

    // Send structured response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...(errorDetails && { errorDetails }),
    });
  }
}