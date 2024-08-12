import { Module } from '@nestjs/common';

import { ContextStorageService } from './services/context-storage.service';

@Module({
  providers: [ContextStorageService],
  exports: [ContextStorageService],
})
export class ContextStorageModule {}
