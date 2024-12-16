import { Test, TestingModule } from '@nestjs/testing';

import { filmResponseMock, filmsResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let filmsService: FilmsService;

  const mockFetchWithCaching = vi.fn();

  const mockGetFilmCacheKey = vi.fn();
  const mockGetFilmsCacheKey = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StarWarsCommonService,
          useValue: {
            fetchWithCaching: mockFetchWithCaching,
            getFilmCacheKey: mockGetFilmCacheKey,
            getFilmsCacheKey: mockGetFilmsCacheKey,
          },
        },
        FilmsService,
        {
          provide: SwapiService,
          useValue: {
            getFilm: vi.fn(),
            getFilms: vi.fn(),
          },
        },
      ],
    }).compile();

    filmsService = module.get<FilmsService>(FilmsService);
  });

  describe('single film data', () => {
    it('should return mapped data', async () => {
      const mockId = 22;
      mockFetchWithCaching.mockReturnValue(filmResponseMock);

      const result = await filmsService.findOne(mockId);

      expect(mockGetFilmCacheKey).toHaveBeenCalledWith(mockId);
      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple films data', () => {
    it('should return mapped data', async () => {
      const mockPage = 6;
      mockFetchWithCaching.mockReturnValue(filmsResponseMock);

      const result = await filmsService.findAll(mockPage);

      expect(mockGetFilmsCacheKey).toHaveBeenCalledWith(mockPage);
      expect(result).toMatchSnapshot();
    });
  });

  describe('getUniqueWordsCount', () => {
    it('should return unique words count', async () => {
      mockFetchWithCaching.mockReturnValue(filmsResponseMock);

      const result = await filmsService.getUniqueWordsCount();

      expect(result).toMatchSnapshot();
    });
  });
});
