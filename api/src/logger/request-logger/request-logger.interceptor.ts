import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { LoggerService } from '../services/logger.service';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req: Request = context.switchToHttp().getRequest();
    const { method, url } = req;

    this.logger.log(`${method} ${url} REQUEST`);
    return next.handle();
  }
}
