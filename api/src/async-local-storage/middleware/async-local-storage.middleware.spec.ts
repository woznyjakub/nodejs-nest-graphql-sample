import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

import { Test } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ALSContext } from '../async-local-storage.module';

import { AsyncLocalStorageMiddleware } from './async-local-storage.middleware';

vi.mock('node:async_hooks', () => ({
  AsyncLocalStorage: vi.fn(() => ({
    run: vi.fn((_: void, callback: Function) => {
      callback();
    }),
  })),
}));

vi.mock('node:crypto', () => ({
  randomUUID: vi.fn(() => 'mock-uuid'),
}));

describe('AsyncLocalStorageMiddleware', () => {
  let middleware: AsyncLocalStorageMiddleware;
  let asyncLocalStorage: AsyncLocalStorage<ALSContext>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AsyncLocalStorageMiddleware,
        {
          provide: AsyncLocalStorage,
          useValue: new AsyncLocalStorage<ALSContext>(),
        },
      ],
    }).compile();

    middleware = moduleRef.get<AsyncLocalStorageMiddleware>(AsyncLocalStorageMiddleware);
    asyncLocalStorage = moduleRef.get<AsyncLocalStorage<ALSContext>>(AsyncLocalStorage);
  });

  it('should use existing x-request-id header if present', () => {
    const req = { headers: { 'x-request-id': 'test-id' } } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(asyncLocalStorage.run).toHaveBeenCalledWith(
      { traceId: 'test-id' },
      expect.any(Function),
    );
    expect(next).toHaveBeenCalled();
  });

  it('should generate new UUID if x-request-id header is not present', () => {
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(asyncLocalStorage.run).toHaveBeenCalledWith(
      { traceId: 'mock-uuid' },
      expect.any(Function),
    );
    expect(randomUUID).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should call next function inside asyncLocalStorage.run', () => {
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
