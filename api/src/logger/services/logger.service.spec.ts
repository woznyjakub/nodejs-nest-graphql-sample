import { mkdirSync } from 'fs';

import { createLogger } from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

import { LoggerService } from './logger.service';

const loggerMock = vi.hoisted(() => ({
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
}));
const logsDirMock = vi.hoisted(() => '/test-path/logs');

vi.mock('fs');
vi.mock('path', () => ({ join: vi.fn(() => logsDirMock) }));
vi.mock('@utils/config', () => ({
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

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  it('should create log directory on initialization', () => {
    expect(mkdirSync).toHaveBeenCalledWith('/test-path/logs', { recursive: true, mode: 0o755 });
  });

  it('should create Winston logger with correct configuration', () => {
    expect(createLogger).toHaveBeenCalled();
    expect(WinstonDaily).toHaveBeenCalledTimes(2);
  });

  it('should log info messages', () => {
    const message = 'Test info message';
    loggerService.log(message);
    expect(loggerMock.info).toHaveBeenCalledWith(message);
  });

  it('should log error messages', () => {
    const message = 'Test error message';
    loggerService.error(message);
    expect(loggerMock.error).toHaveBeenCalledWith(message);
  });

  it('should log warning messages', () => {
    const message = 'Test warning message';
    loggerService.warn(message);
    expect(loggerMock.warn).toHaveBeenCalledWith(message);
  });

  it('should log debug messages', () => {
    const message = 'Test debug message';
    loggerService.debug(message);
    expect(loggerMock.debug).toHaveBeenCalledWith(message);
  });

  it('should handle additional parameters in log methods', () => {
    const message = 'Test message with params';
    const params = [1, { test: 'object' }, [1, 2, 3]];
    loggerService.log(message, ...params);
    expect(loggerMock.info).toHaveBeenCalledWith(message, ...params);
  });
});
