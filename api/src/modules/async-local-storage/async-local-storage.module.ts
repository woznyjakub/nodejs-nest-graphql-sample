import { AsyncLocalStorage } from 'node:async_hooks';

import { Module } from '@nestjs/common';

export type ALSContext = {
  traceId: string;
};

@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
  exports: [AsyncLocalStorage],
})
export class AsyncLocalStorageModule {}
