import { randomUUID } from 'node:crypto';

import { Test } from '@nestjs/testing';
import { NextFunction, Request, Response } from 'express';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ContextStorageMiddleware } from './context-storage.middleware';

import { ContextStorageService } from '@context-storage/services/context-storage.service';

vi.mock('node:crypto', () => ({
  randomUUID: vi.fn(() => 'mock-uuid'),
}));

describe('ContextStorageMiddleware', () => {
  let middleware: ContextStorageMiddleware;
  let contextStorageService: ContextStorageService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ContextStorageMiddleware,
        {
          provide: ContextStorageService,
          useValue: {
            wrapWithContext: vi.fn((_: void, callback: Function) => {
              callback();
            }),
          },
        },
      ],
    }).compile();

    middleware = module.get(ContextStorageMiddleware);
    contextStorageService = module.get(ContextStorageService);
  });

  it('should use existing x-trace-id header if present', () => {
    const req = { headers: { 'x-trace-id': 'test-id' } } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(contextStorageService.wrapWithContext).toHaveBeenCalledWith(
      { traceId: 'test-id' },
      expect.any(Function),
    );
    expect(next).toHaveBeenCalled();
  });

  it('should generate new UUID if x-trace-id header is not present', () => {
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(contextStorageService.wrapWithContext).toHaveBeenCalledWith(
      { traceId: 'mock-uuid' },
      expect.any(Function),
    );
    expect(randomUUID).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should call next function inside "run" callback', () => {
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
