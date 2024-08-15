import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

import { ContextStore, PredefinedContextFields } from './utils/context-store';

@Injectable()
export class ContextStorageService {
  private asyncLocalStorage = new AsyncLocalStorage<ContextStore>();

  /**
   * undefined when wrapWithContext() was not called by middleware
   */
  getStore(): ContextStore | undefined {
    return this.asyncLocalStorage.getStore();
  }

  getPredefinedFields(): PredefinedContextFields | undefined {
    return this.getStore()?.getPredefined();
  }

  wrapWithContext(predefinedFields: PredefinedContextFields, wrapperCallback: () => void): void {
    this.asyncLocalStorage.run(
      new ContextStore(predefinedFields), //
      wrapperCallback,
    );
  }
}
