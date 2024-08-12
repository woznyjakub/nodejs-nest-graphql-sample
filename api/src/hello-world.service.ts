import { Injectable } from '@nestjs/common';

import { ContextStorageService } from '@context-storage/services/context-storage.service';

@Injectable()
export class HelloWorldService {
  constructor(private readonly ctxStorageService: ContextStorageService) {}
  getHello(): string {
    const { traceId } = this.ctxStorageService.getPredefinedFields();

    return `Hello World! trace id: ${traceId}`;
  }
}
