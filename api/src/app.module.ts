import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AsyncLocalStorageModule } from '@async-local-storage/async-local-storage.module';
import { AsyncLocalStorageMiddleware } from '@async-local-storage/middleware/async-local-storage.middleware';
import { AllExceptionsFilter } from '@common/filters/all-exceptions/all-exceptions.filter';
import { RequestLoggerInterceptor } from '@common/interceptors/request-logger/request-logger.interceptor';
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
  imports: [LoggerModule, AsyncLocalStorageModule],
  controllers: [AppController],
  providers: [AppService, ...globalInterceptors, ...globalMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AsyncLocalStorageMiddleware).forRoutes('*');
  }
}
