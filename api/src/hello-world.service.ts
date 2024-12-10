import { Injectable } from '@nestjs/common';

import { SwapiService } from './modules/swapi/swapi.service';

import { ContextStorageService } from '@context-storage/services/context-storage.service';
import { LoggerService } from '@logger/services/logger.service';

@Injectable()
export class HelloWorldService {
  constructor(
    private readonly ctxStorageService: ContextStorageService,
    private logger: LoggerService,
    private swapiService: SwapiService,
  ) {}

  async getHello(): Promise<string> {
    const { traceId } = this.ctxStorageService.getPredefinedFields()!;

    const vehicles = await this.swapiService.getVehicle(4);

    this.logger.log('Hello World!');
    return `Hello World! Trace ID: ${traceId} ;;; ${JSON.stringify(vehicles, null, 2)}`;
  }
}
