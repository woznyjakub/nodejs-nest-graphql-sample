import { Test, TestingModule } from '@nestjs/testing';

import { speciesResponseMock, speciesManyResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { SpeciesService } from './species.service';

describe('SpeciesService', () => {
  let speciesManyService: SpeciesService;

  const mockFetchWithCaching = vi.fn();

  const mockGetSpeciesCacheKey = vi.fn();
  const mockGetSpeciesManyCacheKey = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StarWarsCommonService,
          useValue: {
            fetchWithCaching: mockFetchWithCaching,
            getSpeciesCacheKey: mockGetSpeciesCacheKey,
            getSpeciesManyCacheKey: mockGetSpeciesManyCacheKey,
          },
        },
        SpeciesService,
        {
          provide: SwapiService,
          useValue: {
            getSpecies: vi.fn(),
            getSpeciesMany: vi.fn(),
          },
        },
      ],
    }).compile();

    speciesManyService = module.get<SpeciesService>(SpeciesService);
  });

  describe('single species data', () => {
    it('should return mapped data', async () => {
      const mockId = 22;
      mockFetchWithCaching.mockReturnValue(speciesResponseMock);

      const result = await speciesManyService.findOne(mockId);

      expect(mockGetSpeciesCacheKey).toHaveBeenCalledWith(mockId);
      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple speciesMany data', () => {
    it('should return mapped data', async () => {
      const mockPage = 6;
      mockFetchWithCaching.mockReturnValue(speciesManyResponseMock);

      const result = await speciesManyService.findAll(mockPage);

      expect(mockGetSpeciesManyCacheKey).toHaveBeenCalledWith(mockPage);
      expect(result).toMatchSnapshot();
    });
  });
});
