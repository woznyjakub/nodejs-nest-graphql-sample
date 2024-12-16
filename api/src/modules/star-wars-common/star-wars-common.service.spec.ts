import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

import { StarWarsCommonService } from './star-wars-common.service';

describe('StarWarsCommonService', () => {
  let swCommonService: StarWarsCommonService;

  const mockGetFromCache = vi.fn();
  const mockSetCachedValue = vi.fn();

  const mockGetData = vi.fn();

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
        StarWarsCommonService,
      ],
    }).compile();

    swCommonService = module.get<StarWarsCommonService>(StarWarsCommonService);
  });

  describe('fetchWithCaching', () => {
    it('should return data from cache when cached', async () => {
      const cachedDataRef = {};
      mockGetFromCache.mockReturnValue(cachedDataRef);
      mockGetData.mockReturnValue(undefined);

      const result = await swCommonService.fetchWithCaching('mock-key', mockGetData);

      expect(result).toBe(cachedDataRef);
      expect(mockSetCachedValue).not.toBeCalled();
    });

    it('should return data from callback when not cached', async () => {
      const uncachedDataRef = {};
      const cacheKey = 'mock-key';
      mockGetFromCache.mockReturnValue(undefined);
      mockGetData.mockReturnValue(uncachedDataRef);

      const result = await swCommonService.fetchWithCaching(cacheKey, mockGetData);

      expect(result).toBe(uncachedDataRef);
      expect(mockSetCachedValue).toBeCalledWith(cacheKey, uncachedDataRef);
    });
  });

  describe('buildCacheKey-dependent methods', () => {
    it('should generate correct vehicle cache key', () => {
      const id = 42;
      const result = swCommonService.getVehicleCacheKey(id);
      expect(result).toBe(`swapi-vehicle-id-${id}`);
    });

    it('should generate correct vehicles cache key', () => {
      const page = 5;
      const result = swCommonService.getVehiclesCacheKey(page);
      expect(result).toBe(`swapi-vehicles-page-${page}`);
    });

    it('should generate correct film cache key', () => {
      const id = 10;
      const result = swCommonService.getFilmCacheKey(id);
      expect(result).toBe(`swapi-film-id-${id}`);
    });

    it('should generate correct films cache key', () => {
      const page = 3;
      const result = swCommonService.getFilmsCacheKey(page);
      expect(result).toBe(`swapi-films-page-${page}`);
    });

    it('should generate correct starship cache key', () => {
      const id = 99;
      const result = swCommonService.getStarshipCacheKey(id);
      expect(result).toBe(`swapi-starship-id-${id}`);
    });

    it('should generate correct starships cache key', () => {
      const page = 7;
      const result = swCommonService.getStarshipsCacheKey(page);
      expect(result).toBe(`swapi-starships-page-${page}`);
    });

    it('should generate correct planet cache key', () => {
      const id = 15;
      const result = swCommonService.getPlanetCacheKey(id);
      expect(result).toBe(`swapi-planet-id-${id}`);
    });

    it('should generate correct planets cache key', () => {
      const page = 2;
      const result = swCommonService.getPlanetsCacheKey(page);
      expect(result).toBe(`swapi-planets-page-${page}`);
    });

    it('should generate correct species cache key', () => {
      const id = 8;
      const result = swCommonService.getSpeciesCacheKey(id);
      expect(result).toBe(`swapi-species-id-${id}`);
    });

    it('should generate correct speciesMany cache key', () => {
      const page = 4;
      const result = swCommonService.getSpeciesManyCacheKey(page);
      expect(result).toBe(`swapi-speciesMany-page-${page}`);
    });

    it('should generate correct people cache key', () => {
      const page = 1;
      const result = swCommonService.getPeople(page);
      expect(result).toBe(`swapi-people-page-${page}`);
    });
  });
});
