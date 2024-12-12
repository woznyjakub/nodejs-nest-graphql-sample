import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

import { SwapiService } from '../swapi/swapi.service';

import { mappedVehicleMock, mappedVehiclesMock, vehicleMock, vehiclesMock } from './test/mocks';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;

  const mockGetVehicle = vi.fn();
  const mockGetVehicles = vi.fn();

  const mockGetFromCache = vi.fn();
  const mockSetCachedValue = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: mockGetFromCache,
            set: mockSetCachedValue,
          },
        },
        {
          provide: SwapiService,
          useValue: {
            getVehicle: mockGetVehicle,
            getVehicles: mockGetVehicles,
          },
        },
        VehiclesService,
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  describe('single vehicle data', () => {
    it('should return mapped data when not cached', async () => {
      mockGetVehicle.mockReturnValue(vehicleMock);

      const result = await service.findOne(1);

      expect(result).toEqual(mappedVehicleMock);
    });

    it('should return mapped data when cached', async () => {
      mockGetVehicle.mockReturnValue(undefined);
      mockGetFromCache.mockReturnValue(vehicleMock);

      const result = await service.findOne(1);

      expect(result).toEqual(mappedVehicleMock);
    });
  });

  describe('multiple vehicles data', () => {
    it('should return mapped data when not cached', async () => {
      mockGetVehicles.mockReturnValue(vehiclesMock);

      const result = await service.findAll(1);

      expect(result).toEqual(mappedVehiclesMock);
    });

    it('should return mapped data when cached', async () => {
      mockGetVehicles.mockReturnValue(undefined);
      mockGetFromCache.mockReturnValue(vehiclesMock);

      const result = await service.findAll(1);

      expect(result).toEqual(mappedVehiclesMock);
    });
  });
});
