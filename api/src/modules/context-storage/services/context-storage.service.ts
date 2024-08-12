import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import { ContextStore, PredefinedContextFields } from './utils/context-store';

@Injectable()
export class ContextStorageService {
  private asyncLocalStorage = new AsyncLocalStorage<ContextStore>();

  getStore(): ContextStore {
    return this.asyncLocalStorage.getStore()!;
  }

  getPredefinedFields(): PredefinedContextFields {
    return this.getStore().getPredefined();
  }

  wrapWithContext(predefinedFields: PredefinedContextFields, wrapperCallback: () => void): void {
    this.asyncLocalStorage.run(
      new ContextStore(predefinedFields), //
      wrapperCallback,
    );
  }
}
