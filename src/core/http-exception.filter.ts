import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
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

    this.logger.error(
      `Request failed: ${request.method} ${request.url}`,
      JSON.stringify({
        body: request.body,
        error: exception,
      }),
    );

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
