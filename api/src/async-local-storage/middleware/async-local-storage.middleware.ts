import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ALSContext } from '../async-local-storage.module';

@Injectable()
export class AsyncLocalStorageMiddleware implements NestMiddleware {
  constructor(private readonly asyncLocalStorage: AsyncLocalStorage<ALSContext>) {}
  use(req: Request, _res: Response, next: NextFunction): void {
    const traceId = String(req.headers['x-request-id'] || randomUUID());

    this.asyncLocalStorage.run({ traceId }, () => {
      next();
    });
  }
}
