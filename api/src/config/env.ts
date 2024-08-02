import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';

export enum NodeEnv {
  Dev = 'development',
  Prod = 'production',
  Provision = 'provision',
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
}
