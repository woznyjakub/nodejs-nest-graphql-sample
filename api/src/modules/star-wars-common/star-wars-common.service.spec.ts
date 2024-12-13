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
});
