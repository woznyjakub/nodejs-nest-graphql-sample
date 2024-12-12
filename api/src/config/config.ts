import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import dotenv from 'dotenv';
import { memoize, camelCase } from 'lodash';

import { EnvironmentVariables, LogLevel, NodeEnv } from './env';

export type Config = {
  port: number;
  nodeEnv: NodeEnv;
  apiGlobalPrefix: string;
  logLevel: LogLevel;
  logDir: string;
  cacheHost: string;
  cachePort: number;
};

type UnvalidatedEnv = Record<string, unknown>;

const transformEnv = (env: UnvalidatedEnv): EnvironmentVariables =>
  plainToInstance(EnvironmentVariables, env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

const loadEnv = (): void => {
  dotenv.config({
    path: ['.env'],
  });
};

const validateEnv = (env: UnvalidatedEnv): EnvironmentVariables => {
  const transformedEnv = transformEnv(env);
  const errors = validateSync(transformedEnv, { skipMissingProperties: false });

  if (errors.length) {
    throw new Error(errors.toString());
  }
  return transformedEnv;
};

export const getConfig = memoize((): Config => {
  loadEnv(); // moved loading env variables here after the issues with using getConfig inside decorator declarations
  const transformedEnv = validateEnv(process.env);

  const camelCasedEnv = Object.entries(transformedEnv).reduce<Partial<Config>>((result, [k, v]) => {
    const newk = camelCase(k) as keyof Config;
    return { ...result, [newk]: v };
  }, {});

  return camelCasedEnv as Config;
});
