import { Injectable } from '@nestjs/common';

import { ContextStorageService } from '@context-storage/services/context-storage.service';
import { LoggerService } from '@logger/services/logger.service';

@Injectable()
export class HelloWorldService {
  constructor(
    private readonly ctxStorageService: ContextStorageService,
    private logger: LoggerService,
  ) {}

  getHello(): string {
    const { traceId } = this.ctxStorageService.getPredefinedFields()!;

    this.logger.log('Hello World!');
    return `Hello World! Trace ID: ${traceId}`;
  }
}
