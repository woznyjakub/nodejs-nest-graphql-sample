import { AsyncLocalStorage } from 'node:async_hooks';

import { Test } from '@nestjs/testing';
import { Mock } from 'vitest';

import { ContextStorageService } from './context-storage.service';
import { ContextStore, PredefinedContextFields } from './utils/context-store';

const mockPredefinedFields = {} as PredefinedContextFields;
const mockStore = vi.hoisted(() => ({ getPredefined: vi.fn(() => mockPredefinedFields) }));
const mockAlsRun = vi.fn((_predefinedFields: PredefinedContextFields, callback: Function) => {
  callback();
});

const mockAlsGetStore: Mock<AsyncLocalStorage<unknown>['getStore']> = vi.fn(() => mockStore);

vi.mock('node:async_hooks', () => ({
  AsyncLocalStorage: vi.fn(() => ({
    run: mockAlsRun,
    getStore: mockAlsGetStore,
  })),
}));

vi.mock('./utils/context-store', () => ({
  ContextStore: vi.fn(() => mockStore),
}));

describe('ContextStorageService', () => {
  let contextStorageService: ContextStorageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ContextStorageService],
    }).compile();

    contextStorageService = module.get(ContextStorageService);
  });

  it('should return store', () => {
    const store = contextStorageService.getStore();

    expect(store).toBe(mockStore);
  });

  it('should return store predefined fields', () => {
    const storePF = contextStorageService.getPredefinedFields();

    expect(storePF).toBe(mockPredefinedFields);
  });

  it('should create context', () => {
    const callback = vi.fn();

    contextStorageService.wrapWithContext(mockPredefinedFields, callback);

    expect(mockAlsRun).toBeCalledWith(new ContextStore(mockPredefinedFields), callback);
    expect(ContextStore).toBeCalledWith(mockPredefinedFields);
  });

  describe('should return undefined when AsyncLocalStorage context has not been initalized by middleware', () => {
    // there are 2 different 'getStore' methods/functions
    // integration tests check this behavior better
    it('getStore', () => {
      mockAlsGetStore.mockReturnValue(undefined);

      const store = contextStorageService.getStore();

      expect(store).toBe(undefined);
    });

    it('getPredefinedFields', () => {
      mockAlsGetStore.mockReturnValue(undefined);

      const storePF = contextStorageService.getPredefinedFields();

      expect(storePF).toBe(undefined);
    });
  });
});
