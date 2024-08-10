import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

import { config } from 'dotenv';
import { resolve } from 'path';

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.ts'],
    globals: true,
    restoreMocks: true,
    root: './',
    env: { ...config({ path: './.env' }).parsed },
  },
  resolve: {
    alias: {
      '@common': resolve(__dirname, './src/common'),
      '@utils': resolve(__dirname, './src/utils'),
      '@async-local-storage': resolve(__dirname, './src/async-local-storage'),
      '@logger': resolve(__dirname, './src/logger'),
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});
