import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

import { AppModule } from './app.module';
import { LoggerService } from './logger/services/logger.service';

import { getConfig, validateEnv } from '@utils/config';

async function bootstrap(): Promise<void> {
  dotenv.config();
  validateEnv(process.env);

  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  const { port } = getConfig();

  await app.listen(port);
}
void bootstrap();
