import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { Injectable, type LoggerService as NestLoggerService } from '@nestjs/common';
import {
  createLogger,
  Logger as WinstonLogger,
  format,
  transports,
  type LeveledLogMethod,
} from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

import { getConfig } from '@config/config';
import { ContextStorageService } from '@context-storage/services/context-storage.service';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: WinstonLogger;

  constructor(private readonly ctxStorageService: ContextStorageService) {
    const { logDir, logLevel } = getConfig();
    const absoluteLogdir = join(process.cwd(), logDir);
    this.setupLogDir(absoluteLogdir);

    const logFormat = format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
    );

    this.logger = createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      level: logLevel,
      transports: [
        new transports.Console({
          format: format.combine(format.splat(), format.colorize({ all: true })),
        }),
        new WinstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: join(absoluteLogdir, 'debug'),
          filename: `%DATE%.log`,
          maxFiles: 30,
          json: false,
          zippedArchive: true,
        }),
        new WinstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: join(absoluteLogdir, 'error'),
          filename: `%DATE%.log`,
          maxFiles: 30,
          handleExceptions: true,
          json: false,
          zippedArchive: true,
        }),
      ],
    });
  }

  log(message: string, ...optionalParams: unknown[]): void {
    this.runLog(this.logger.info, message, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]): void {
    this.runLog(this.logger.error, message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    this.runLog(this.logger.warn, message, ...optionalParams);
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    this.runLog(this.logger.debug, message, ...optionalParams);
  }

  private runLog(logFn: LeveledLogMethod, message: string, ...optionalParams: unknown[]): void {
    const traceId = this.ctxStorageService.getPredefinedFields()?.traceId ?? null;

    logFn(this.formatMessage(message, traceId, optionalParams));
  }

  private setupLogDir(logDir: string): void {
    mkdirSync(logDir, { recursive: true, mode: 0o755 });
  }

  private formatMessage(
    message: string,
    traceId: string | null,
    optionalParams: unknown[],
  ): string {
    const traceIdPart = traceId && `Trace ID: ${traceId}`;
    const metadataPart = optionalParams.length && `Metadata: ${this.parseMetadata(optionalParams)}`;

    return [message, traceIdPart, metadataPart].filter(Boolean).join(', ');
  }

  private parseMetadata(data: unknown): string {
    try {
      return JSON.stringify(data);
    } catch (error) {
      return `Failed to parse metadata. Error: ${error}`;
    }
  }
}
