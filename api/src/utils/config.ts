import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { memoize, camelCase } from 'lodash';

import { EnvironmentVariables, LogLevel, NodeEnv } from './env';

export type Config = {
  port: number;
  nodeEnv: NodeEnv;
  logLevel: LogLevel;
  logDir: string;
};

type UnvalidatedEnv = Record<string, unknown>;

const transformEnv = (env: UnvalidatedEnv): EnvironmentVariables =>
  plainToInstance(EnvironmentVariables, env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

export const validateEnv = (env: UnvalidatedEnv): EnvironmentVariables => {
  const transformedEnv = transformEnv(env);
  const errors = validateSync(transformedEnv, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return transformedEnv;
};

export const getConfig = memoize((): Config => {
  const transformedEnv = transformEnv(process.env);

  const camelCasedEnv = Object.entries(transformedEnv).reduce<Partial<Config>>((result, [k, v]) => {
    const newk = camelCase(k) as keyof Config;
    return { ...result, [newk]: v };
  }, {});

  return camelCasedEnv as Config;
});