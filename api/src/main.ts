import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { getConfig, loadEnv, validateEnv } from '@config/config';
import { LoggerService } from '@logger/services/logger.service';

async function bootstrap(): Promise<void> {
  loadEnv();
  validateEnv(process.env);
  const { port, apiGlobalPrefix } = getConfig();

  const app = await NestFactory.create(AppModule);

  const logger = app.get(LoggerService);
  app.useLogger(logger);

  app.setGlobalPrefix(apiGlobalPrefix);

  app.enableCors({
    origin: ['http://localhost'],
    methods: 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
    credentials: true,
    maxAge: 600,
  });

  await app.listen(port);
}
void bootstrap();
