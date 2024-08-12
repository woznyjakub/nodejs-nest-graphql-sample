import { Test } from '@nestjs/testing';

import { ContextStorageService } from './context-storage.service';
import { ContextStore, PredefinedContextFields } from './utils/context-store';

const mockPredefinedFields = {} as PredefinedContextFields;
const mockStore = vi.hoisted(() => ({ getPredefined: vi.fn(() => mockPredefinedFields) }));
const mockAlsRun = vi.fn((_predefinedFields: PredefinedContextFields, callback: Function) => {
  callback();
});

vi.mock('node:async_hooks', () => ({
  AsyncLocalStorage: vi.fn(() => ({
    run: mockAlsRun,
    getStore: vi.fn(() => mockStore),
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
    const result = contextStorageService.getStore();

    expect(result).toBe(mockStore);
  });

  it('should return store predefined fields', () => {
    const result = contextStorageService.getPredefinedFields();

    expect(result).toBe(mockPredefinedFields);
  });

  it('should create context', () => {
    const callback = vi.fn();

    contextStorageService.wrapWithContext(mockPredefinedFields, callback);

    expect(mockAlsRun).toBeCalledWith(new ContextStore(mockPredefinedFields), callback);
    expect(ContextStore).toBeCalledWith(mockPredefinedFields);
  });
});
