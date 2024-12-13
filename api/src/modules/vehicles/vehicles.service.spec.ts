import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { mappedVehicleMock, mappedVehiclesMock, vehicleMock, vehiclesMock } from './test/mocks';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;

  const mockFetchWithCaching = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: StarWarsCommonService,
          useValue: {
            fetchWithCaching: mockFetchWithCaching,
          },
        },
        VehiclesService,
        SwapiService,
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  describe('single vehicle data', () => {
    it('should return mapped data', async () => {
      mockFetchWithCaching.mockReturnValue(vehicleMock);

      const result = await service.findOne(1);

      expect(result).toEqual(mappedVehicleMock);
    });
  });

  describe('multiple vehicles data', () => {
    it('should return mapped data when', async () => {
      mockFetchWithCaching.mockReturnValue(vehiclesMock);

      const result = await service.findAll(1);

      expect(result).toEqual(mappedVehiclesMock);
    });
  });
});
