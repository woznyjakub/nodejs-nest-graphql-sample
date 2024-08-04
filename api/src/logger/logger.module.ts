import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { RequestLoggerInterceptor } from './request-logger/request-logger.interceptor';
import { LoggerService } from './services/logger.service';

@Module({
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
