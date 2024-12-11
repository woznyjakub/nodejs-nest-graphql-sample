import { Test, TestingModule } from '@nestjs/testing';

import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

describe('VehiclesResolver', () => {
  let resolver: VehiclesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesResolver, VehiclesService],
    }).compile();

    resolver = module.get<VehiclesResolver>(VehiclesResolver);
  });

  it.skip('should be defined', () => {
    // @todo integration tests
    expect(resolver).toBeDefined();
  });
});
