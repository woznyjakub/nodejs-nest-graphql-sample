import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest.js + React.js Monorepo rich starter')
    .setDescription('Main backend API description')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiGlobalPrefix}/docs`, app, document);

  await app.listen(port, '0.0.0.0');
}
void bootstrap();
