import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import dotenv from 'dotenv';

import { AppModule } from './app.module';

import { getConfig, validateEnv } from '@config/config';
import { LoggerService } from '@logger/services/logger.service';

async function bootstrap(): Promise<void> {
  dotenv.config();
  validateEnv(process.env);

  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  const prefix = '/api';
  app.setGlobalPrefix(prefix);

  app.enableCors({
    origin: ['http://localhost'],
    methods: 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
    credentials: true,
    maxAge: 600,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SyncroChat')
    .setDescription('SyncroChat main backend API description')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${prefix}/docs`, app, document);

  const { port } = getConfig();

  await app.listen(port, '0.0.0.0');
}
void bootstrap();
