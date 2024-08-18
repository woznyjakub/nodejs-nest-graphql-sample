import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getConfig } from '@config/config';
import { NodeEnv } from '@config/env';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        const { nodeEnv, dbHost, dbPort, postgresDb, dbAppUserName, dbAppUserPassword } =
          getConfig();

        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          database: postgresDb,
          username: dbAppUserName,
          password: dbAppUserPassword,
          synchronize: nodeEnv !== NodeEnv.Prod,
        };
      },
    }),
  ],
})
export class MainDbModule {}
