import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

import { ContextStorageService } from '@context-storage/services/context-storage.service';
import { LoggerService } from '@logger/services/logger.service';

export type DefaultErrorResponse = {
  statusCode: HttpStatus;
  timestamp: string;
  traceId: string;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly ctxStorageService: ContextStorageService,
  ) {
    super();
  }
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const { traceId } = this.ctxStorageService.getPredefinedFields();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      traceId,
    } satisfies DefaultErrorResponse;

    try {
      // throw new Error(...) cases
      // @ts-ignore
      this.logger.error(exception);
    } catch (error) {
      // edge cases like: throw null
      // eslint-disable-next-line
      console.error({ originalException: exception, error });
    }

    res.status(httpStatus).json(responseBody);
  }
}
