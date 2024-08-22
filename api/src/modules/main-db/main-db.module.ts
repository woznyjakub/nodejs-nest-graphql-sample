import { join } from 'node:path/posix';

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { memoize } from 'lodash';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { getConfig } from '@config/config';

export const createDbConfig = memoize((isLocal = false) => {
  const { dbHost, dbPort, postgresDb, dbAppUserName, dbAppUserPassword } = getConfig();

  return {
    type: 'postgres',
    host: isLocal ? 'localhost' : dbHost,
    port: dbPort,
    database: postgresDb,
    username: dbAppUserName,
    password: dbAppUserPassword,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(process.cwd(), 'src', '**', '*.entity.ts')],
    migrations: [join(process.cwd(), 'src', '**', 'main-db', 'migrations', '*.ts')],
  } satisfies TypeOrmModuleOptions;
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: createDbConfig,
    }),
  ],
})
export class MainDbModule {}
