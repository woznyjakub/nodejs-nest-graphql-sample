import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { memoize, camelCase } from 'lodash';

import { EnvironmentVariables, NodeEnv } from './env';

export type Config = {
  port: number;
  nodeEnv: NodeEnv;
};

const transformEnv = (config: Record<string, unknown>): EnvironmentVariables =>
  plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

const validateEnv = (config: Record<string, unknown>): EnvironmentVariables => {
  const transformedConfig = transformEnv(config);
  const errors = validateSync(transformedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return transformedConfig;
};

export const getConfig = memoize((): Config => {
  const transformedEnv = transformEnv(process.env);

  const camelCasedEnv = Object.entries(transformedEnv).reduce<Partial<Config>>((result, [k, v]) => {
    const newk = camelCase(k) as keyof Config;
    return { ...result, [newk]: v };
  }, {});

  return camelCasedEnv as Config;
});

export const ConfigurationModule = ConfigModule.forRoot({
  cache: true,
  load: [getConfig],
  validate: validateEnv,
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
});
