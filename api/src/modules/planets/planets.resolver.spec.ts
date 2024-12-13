import { Test, TestingModule } from '@nestjs/testing';

import { SwapiModule } from '../swapi/swapi.module';

import { PlanetsResolver } from './planets.resolver';
import { PlanetsService } from './planets.service';

describe.skip('PlanetsResolver', () => {
  let resolver: PlanetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwapiModule],
      providers: [PlanetsResolver, PlanetsService],
    }).compile();

    resolver = module.get<PlanetsResolver>(PlanetsResolver);
  });

  it('should be defined', () => {
    // @todo integration tests
    expect(resolver).toBeDefined();
  });
});
