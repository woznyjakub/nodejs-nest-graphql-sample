import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import { ALSContext } from './async-local-storage/async-local-storage.module';

@Injectable()
export class AppService {
  constructor(private readonly als: AsyncLocalStorage<ALSContext>) {}
  getHello(): string {
    const { traceId } = this.als.getStore()!;
    const message = `Hello World! trace id: ${traceId}`;

    return message;
  }
}
