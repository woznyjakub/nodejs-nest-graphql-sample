import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';

import { AllExceptionsFilter, DefaultErrorResponse } from './all-exceptions.filter';

import { ContextStorageService } from '@context-storage/services/context-storage.service';
import { LoggerService } from '@logger/services/logger.service';

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let loggerService: LoggerService;

  const mockTraceId = 'mock-trace-id';
  const mockRes = {
    json: vi.fn(),
    status: vi.fn(),
  };
  const mockArgumentsHost = {
    switchToHttp: () => ({
      getResponse: vi.fn(() => mockRes),
      getRequest: vi.fn(),
    }),
  };
  const mockCurrDate = new Date('2024-07-01T12:00:00Z').toISOString();

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(mockCurrDate);

    const module = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: LoggerService,
          useValue: {
            error: vi.fn(),
          },
        },
        {
          provide: ContextStorageService,
          useValue: {
            getPredefinedFields: vi.fn(() => ({ traceId: mockTraceId })),
          },
        },
      ],
    }).compile();

    filter = module.get(AllExceptionsFilter);
    loggerService = module.get(LoggerService);

    // typing workaround
    mockRes.status.mockImplementation(() => mockRes);
  });

  it('should catch HttpException and return correct response', () => {
    const exception = new HttpException('Test exception', HttpStatus.BAD_REQUEST);

    // @ts-expect-error
    filter.catch(exception, mockArgumentsHost);

    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.BAD_REQUEST,
        traceId: mockTraceId,
        timestamp: mockCurrDate,
      } satisfies DefaultErrorResponse),
    );
    expect(loggerService.error).toHaveBeenCalledWith(exception);
  });

  it('should catch unknown exception and return 500 status', () => {
    const exception = new Error('Unknown error');

    // @ts-expect-error
    filter.catch(exception, mockArgumentsHost);

    expect(loggerService.error).toHaveBeenCalledWith(exception);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        traceId: mockTraceId,
        timestamp: mockCurrDate,
      } satisfies DefaultErrorResponse),
    );
  });

  it('should handle edge case exceptions (when loggerService throws an error)', () => {
    const edgeCaseException = null; // like: throw null
    const loggerInternalError = new Error('mock-logger-internal-error');

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (loggerService.error as Mock).mockImplementation(() => {
      throw loggerInternalError;
    });

    // @ts-expect-error
    filter.catch(edgeCaseException, mockArgumentsHost);

    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        traceId: mockTraceId,
        timestamp: mockCurrDate,
      } satisfies DefaultErrorResponse),
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        originalException: edgeCaseException,
        error: loggerInternalError,
      }),
    );
  });
});
