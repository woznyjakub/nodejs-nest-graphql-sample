import { ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';

import { RequestLoggerInterceptor } from './request-logger.interceptor';

import { LoggerService } from '@logger/services/logger.service';

describe('RequestLoggerInterceptor', () => {
  let interceptor: RequestLoggerInterceptor;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RequestLoggerInterceptor,
        {
          provide: LoggerService,
          useValue: {
            log: vi.fn(),
          },
        },
      ],
    }).compile();

    interceptor = module.get<RequestLoggerInterceptor>(RequestLoggerInterceptor);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should log the request method and URL', () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          method: 'GET',
          url: '/test',
        }),
      }),
    } as ExecutionContext;

    const mockCallHandler = {
      handle: () => of(undefined),
    };

    interceptor.intercept(mockExecutionContext, mockCallHandler);

    expect(loggerService.log).toHaveBeenCalledWith('GET /test REQUEST');
  });
});
