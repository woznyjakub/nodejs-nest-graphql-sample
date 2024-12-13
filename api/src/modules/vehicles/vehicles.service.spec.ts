import { Test, TestingModule } from '@nestjs/testing';

import { vehicleResponseMock, vehiclesResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let vehiclesService: VehiclesService;

  const mockFetchWithCaching = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StarWarsCommonService,
          useValue: {
            fetchWithCaching: mockFetchWithCaching,
          },
        },
        VehiclesService,
        {
          provide: SwapiService,
          useValue: {
            getVehicle: vi.fn(),
            getVehicles: vi.fn(),
          },
        },
      ],
    }).compile();

    vehiclesService = module.get<VehiclesService>(VehiclesService);
  });

  describe('single vehicle data', () => {
    it('should return mapped data', async () => {
      mockFetchWithCaching.mockReturnValue(vehicleResponseMock);

      const result = await vehiclesService.findOne(1);

      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple vehicles data', () => {
    it('should return mapped data', async () => {
      mockFetchWithCaching.mockReturnValue(vehiclesResponseMock);

      const result = await vehiclesService.findAll(1);

      expect(result).toMatchSnapshot();
    });
  });
});
