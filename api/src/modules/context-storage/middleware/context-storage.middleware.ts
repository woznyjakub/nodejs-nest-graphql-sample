import { randomUUID } from 'node:crypto';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ContextStorageService } from '@context-storage/services/context-storage.service';

@Injectable()
export class ContextStorageMiddleware implements NestMiddleware {
  constructor(private readonly contextStorageService: ContextStorageService) {}
  use(req: Request, _res: Response, next: NextFunction): void {
    const traceIdHeader = req.headers['x-trace-id'];
    const traceId = typeof traceIdHeader === 'string' ? traceIdHeader : randomUUID();

    this.contextStorageService.wrapWithContext({ traceId }, () => {
      next();
    });
  }
}
