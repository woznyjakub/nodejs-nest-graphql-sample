import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

import { AsyncLocalStorageModule } from '@async-local-storage/async-local-storage.module';
import { AsyncLocalStorageMiddleware } from '@async-local-storage/middleware/async-local-storage.middleware';
@Module({
  imports: [LoggerModule, AsyncLocalStorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AsyncLocalStorageMiddleware).forRoutes('*');
  }
}
