import { getConfig } from './configuration.module';

describe('Configuration module', () => {
  it('should transform screaming snake case env variables to camel case config', () => {
    const config = getConfig();

    expect(config).toMatchInlineSnapshot(`
      {
        "nodeEnv": "development",
        "port": 3000,
      }
    `);
  });
});
