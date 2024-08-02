import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { getConfig } from './config/configuration.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const { port } = getConfig();

  await app.listen(port);
}
bootstrap();
