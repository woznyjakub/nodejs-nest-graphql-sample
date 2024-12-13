import { Test, TestingModule } from '@nestjs/testing';

import { SwapiModule } from '../swapi/swapi.module';

import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';

describe.skip('StarshipsResolver', () => {
  let resolver: StarshipsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwapiModule],
      providers: [StarshipsResolver, StarshipsService],
    }).compile();

    resolver = module.get<StarshipsResolver>(StarshipsResolver);
  });

  it('should be defined', () => {
    // @todo integration tests
    expect(resolver).toBeDefined();
  });
});
