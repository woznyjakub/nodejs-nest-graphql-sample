import { Test, TestingModule } from '@nestjs/testing';

import { SwapiModule } from '../swapi/swapi.module';

import { FilmsResolver } from './films.resolver';
import { FilmsService } from './films.service';

describe.skip('FilmsResolver', () => {
  let resolver: FilmsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwapiModule],
      providers: [FilmsResolver, FilmsService],
    }).compile();

    resolver = module.get<FilmsResolver>(FilmsResolver);
  });

  it('should be defined', () => {
    // @todo integration tests
    expect(resolver).toBeDefined();
  });
});
