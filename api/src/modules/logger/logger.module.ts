import { Module } from '@nestjs/common';

import { LoggerService } from './services/logger.service';

import { ContextStorageModule } from '@context-storage/context-storage.module';

@Module({
  imports: [ContextStorageModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
