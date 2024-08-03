import { getConfig } from './config';

describe('Config', () => {
  it('should transform screaming snake case env variables to camel case config', () => {
    const config = getConfig();

    expect(config).toMatchInlineSnapshot(`
      {
        "logDir": "./logs",
        "logLevel": "debug",
        "nodeEnv": "development",
        "port": 3000,
      }
    `);
  });
});
