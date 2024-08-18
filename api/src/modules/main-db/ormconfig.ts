import { DataSource } from 'typeorm';

import { createDbConfig } from './main-db.module';

import { setupEnv, validateEnv } from '@config/config';

// This file is owned by typeorm cli
const setupDataSource = (): DataSource | void => {
  try {
    setupEnv();
    validateEnv(process.env);

    return new DataSource(createDbConfig(true));
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

export default setupDataSource();
