import { Injectable } from '@nestjs/common';

import { ContextStorageService } from '@context-storage/services/context-storage.service';

@Injectable()
export class AppService {
  constructor(private readonly ctxStorageService: ContextStorageService) {}
  getHello(): string {
    const { traceId } = this.ctxStorageService.getPredefinedFields();
    const message = `Hello World! trace id: ${traceId}`;

    return message;
  }
}
