import { Test, TestingModule } from '@nestjs/testing';

import { SwapiModule } from '../swapi/swapi.module';

import { SpeciesResolver } from './species.resolver';
import { SpeciesService } from './species.service';

describe.skip('SpeciesService', () => {
  let resolver: SpeciesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwapiModule],
      providers: [SpeciesResolver, SpeciesService],
    }).compile();

    resolver = module.get<SpeciesResolver>(SpeciesResolver);
  });

  it('should be defined', () => {
    // @todo integration tests
    expect(resolver).toBeDefined();
  });
});
