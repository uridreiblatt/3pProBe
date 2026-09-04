import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { ErrorLogService } from './error-log.service';

interface MySqlDriverError {
  code?: string;
  errno?: number;
  sqlMessage?: string;
  message?: string;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(
    httpAdapterHost: HttpAdapterHost,
    private readonly errorLogService: ErrorLogService,
  ) {
    super(httpAdapterHost.httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetails: unknown = undefined;

    /**
     * NestJS HTTP exceptions
     * BadRequestException, NotFoundException,
     * UnauthorizedException, ForbiddenException, etc.
     */
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const responseMessage = exceptionResponse.message;

        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(', ');
        } else if (typeof responseMessage === 'string') {
          message = responseMessage;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }

      errorDetails = exceptionResponse;
    } else if (exception instanceof QueryFailedError) {

    /**
     * TypeORM / MySQL database errors
     */
      const driverError = exception.driverError as MySqlDriverError;

      /**
       * Duplicate entry
       * MySQL errno: 1062
       */
      if (driverError?.code === 'ER_DUP_ENTRY' || driverError?.errno === 1062) {
        status = HttpStatus.CONFLICT;
        message = 'Record already exists';

        errorDetails = {
          code: 'DUPLICATE_RESOURCE',
        };
      } else if (

      /**
       * Cannot delete/update parent because
       * another record references it.
       *
       * MySQL errno: 1451
       */
        driverError?.code === 'ER_ROW_IS_REFERENCED_2' ||
        driverError?.errno === 1451
      ) {
        status = HttpStatus.CONFLICT;
        message = 'Cannot delete this record because it is currently in use.';

        errorDetails = {
          code: 'RESOURCE_IN_USE',
        };
      } else if (

      /**
       * Child references a parent that does not exist.
       *
       * MySQL errno: 1452
       */
        driverError?.code === 'ER_NO_REFERENCED_ROW_2' ||
        driverError?.errno === 1452
      ) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Referenced record does not exist.';

        errorDetails = {
          code: 'INVALID_REFERENCE',
        };
      } else {

      /**
       * Any other DB error
       */
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database operation failed';

        errorDetails = {
          code: 'DATABASE_ERROR',
        };
      }
    } else if (exception instanceof Error) {

    /**
     * Any other JavaScript / application error
     */
      status = HttpStatus.INTERNAL_SERVER_ERROR;

      // Don't expose internal details to the client
      message = 'Internal server error';
    }

    /**
     * Log full internal error
     */
    this.logger.error(
      `Request failed: ${request.method} ${request.originalUrl ?? request.url}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    /**
     * Save the full exception internally.
     * Don't expose DB stack traces to the frontend.
     */
    try {
      void this.errorLogService.logError(exception, request);
    } catch (logError) {
      this.logger.error(
        'Failed to save error log',
        logError instanceof Error ? logError.stack : JSON.stringify(logError),
      );
    }

    /**
     * Send safe API response
     */
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.originalUrl ?? request.url,
      message,
      ...(errorDetails !== undefined && {
        errorDetails,
      }),
    });
  }
}
