import { mkdirSync } from 'node:fs';

import { Test } from '@nestjs/testing';
import { createLogger } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

import { LoggerService } from './logger.service';

import { ContextStorageService } from '@context-storage/services/context-storage.service';

const loggerMock = vi.hoisted(() => ({
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
}));
const logsDirMock = vi.hoisted(() => '/test-path/logs');

vi.mock('fs');
vi.mock('path', () => ({ join: vi.fn(() => logsDirMock) }));
vi.mock('@config/config', () => ({
  getConfig: vi.fn(() => ({ logDir: logsDirMock, logLevel: 'info' })),
}));
vi.mock('winston-daily-rotate-file');
vi.mock('winston', () => ({
  createLogger: vi.fn(() => loggerMock),
  format: {
    printf: vi.fn(),
    combine: vi.fn(),
    timestamp: vi.fn(),
    splat: vi.fn(),
    colorize: vi.fn(),
  },
  transports: {
    Console: vi.fn(),
  },
}));

describe('LoggerService', () => {
  let loggerService: LoggerService;
  const mockTraceId = 'mock-trace-id';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: ContextStorageService,
          useValue: {
            getPredefinedFields: vi.fn(() => ({ traceId: mockTraceId })),
          },
        },
      ],
    }).compile();

    loggerService = module.get(LoggerService);
  });

  it('should create log directory on initialization', () => {
    expect(mkdirSync).toHaveBeenCalledWith('/test-path/logs', { recursive: true, mode: 0o755 });
  });

  it('should create Winston logger with correct configuration on initialization', () => {
    expect(createLogger).toHaveBeenCalled();
    expect(WinstonDaily).toHaveBeenCalledTimes(2);
  });

  it('should log info messages with correct format', () => {
    const message = 'Test info message';

    loggerService.log(message);

    expect(loggerMock.info).toHaveBeenCalledWith(`${message}, Trace ID: ${mockTraceId}`);
  });

  it('should log error messages with correct format', () => {
    const message = 'Test error message';

    loggerService.error(message);

    expect(loggerMock.error).toHaveBeenCalledWith(`${message}, Trace ID: ${mockTraceId}`);
  });

  it('should log warning messages with correct format', () => {
    const message = 'Test warning message';

    loggerService.warn(message);

    expect(loggerMock.warn).toHaveBeenCalledWith(`${message}, Trace ID: ${mockTraceId}`);
  });

  it('should log debug messages with correct format', () => {
    const message = 'Test debug message';

    loggerService.debug(message);

    expect(loggerMock.debug).toHaveBeenCalledWith(`${message}, Trace ID: ${mockTraceId}`);
  });

  it('should handle additional parameters in log methods', () => {
    const message = 'Test message with params';
    const params = [1, { test: 'object' }, [1, 2, 3]];

    loggerService.log(message, ...params);

    expect(loggerMock.info).toHaveBeenCalledWith(
      `${message}, Trace ID: ${mockTraceId}, Metadata: ${JSON.stringify(params)}`,
    );
  });

  it('should handle circular dependency in optionalParams', () => {
    const message = 'Test circular dependency';
    const circular = {};
    // @ts-expect-error
    circular.self = circular;

    loggerService.log(message, circular);

    expect(loggerMock.info).toHaveBeenCalledWith(
      expect.stringContaining(message) &&
        expect.stringContaining(`Trace ID: ${mockTraceId}`) &&
        expect.stringContaining(
          'Metadata: Failed to parse metadata. Error: TypeError: Converting circular structure to JSON',
        ),
    );
  });
});
