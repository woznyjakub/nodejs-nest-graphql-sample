import { Test, TestingModule } from '@nestjs/testing';

import { filmResponseMock, filmsResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let filmsService: FilmsService;

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
      mockFetchWithCaching.mockReturnValue(filmResponseMock);

      const result = await filmsService.findOne(1);

      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple films data', () => {
    it('should return mapped data when', async () => {
      mockFetchWithCaching.mockReturnValue(filmsResponseMock);

      const result = await filmsService.findAll(1);

      expect(result).toMatchSnapshot();
    });
  });
});
