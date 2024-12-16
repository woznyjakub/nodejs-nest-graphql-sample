import { Test, TestingModule } from '@nestjs/testing';

import { planetResponseMock, planetsResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { PlanetsService } from './planets.service';

describe('PlanetsService', () => {
  let planetsService: PlanetsService;

  const mockFetchWithCaching = vi.fn();

  const mockGetPlanetCacheKey = vi.fn();
  const mockGetPlanetsCacheKey = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StarWarsCommonService,
          useValue: {
            fetchWithCaching: mockFetchWithCaching,
            getPlanetCacheKey: mockGetPlanetCacheKey,
            getPlanetsCacheKey: mockGetPlanetsCacheKey,
          },
        },
        PlanetsService,
        {
          provide: SwapiService,
          useValue: {
            getPlanet: vi.fn(),
            getPlanets: vi.fn(),
          },
        },
      ],
    }).compile();

    planetsService = module.get<PlanetsService>(PlanetsService);
  });

  describe('single planet data', () => {
    it('should return mapped data', async () => {
      const mockId = 22;
      mockFetchWithCaching.mockReturnValue(planetResponseMock);

      const result = await planetsService.findOne(mockId);

      expect(mockGetPlanetCacheKey).toHaveBeenCalledWith(mockId);
      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple planets data', () => {
    it('should return mapped data', async () => {
      const mockPage = 6;
      mockFetchWithCaching.mockReturnValue(planetsResponseMock);

      const result = await planetsService.findAll(mockPage);

      expect(mockGetPlanetsCacheKey).toHaveBeenCalledWith(mockPage);
      expect(result).toMatchSnapshot();
    });
  });
});
