import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';

export enum NodeEnv {
  Dev = 'development',
  Prod = 'production',
  Provision = 'provision',
}

export enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info', // logger.log(...)
  Debug = 'debug',
}

export class EnvironmentVariables {
  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @Expose()
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel;

  @Expose()
  @IsString()
  LOG_DIR: string;

  @Expose()
  @IsString()
  DB_HOST: string;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @Expose()
  @IsString()
  POSTGRES_DB: string;

  @Expose()
  @IsString()
  DB_APP_USER_NAME: string;

  @Expose()
  @IsString()
  DB_APP_USER_PASSWORD: string;
}
