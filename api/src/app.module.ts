import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AllExceptionsFilter } from '@common/filters/all-exceptions/all-exceptions.filter';
import { RequestLoggerInterceptor } from '@common/interceptors/request-logger/request-logger.interceptor';
import { ContextStorageModule } from '@context-storage/context-storage.module';
import { ContextStorageMiddleware } from '@context-storage/middleware/context-storage.middleware';
import { LoggerModule } from '@logger/logger.module';

const globalMiddleware: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
];

const globalInterceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: RequestLoggerInterceptor,
  },
];

@Module({
  imports: [LoggerModule, ContextStorageModule],
  controllers: [AppController],
  providers: [AppService, ...globalInterceptors, ...globalMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ContextStorageMiddleware).forRoutes('*');
  }
}
