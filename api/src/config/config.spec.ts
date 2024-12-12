import { getConfig } from './config';

describe('Config', () => {
  it('should transform screaming snake case env variables to camel case config', () => {
    const config = getConfig();

    expect(Object.keys(config)).toMatchInlineSnapshot(`
      [
        "port",
        "nodeEnv",
        "logLevel",
        "logDir",
        "apiGlobalPrefix",
        "cacheHost",
        "cachePort",
      ]
    `);
  });
});
