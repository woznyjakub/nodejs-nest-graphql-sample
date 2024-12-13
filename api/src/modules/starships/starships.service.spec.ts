import { Test, TestingModule } from '@nestjs/testing';

import { starshipResponseMock, starshipsResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { StarshipsService } from './starships.service';

describe('StarshipsService', () => {
  let starshipsService: StarshipsService;

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
        StarshipsService,
        {
          provide: SwapiService,
          useValue: {
            getStarship: vi.fn(),
            getStarships: vi.fn(),
          },
        },
      ],
    }).compile();

    starshipsService = module.get<StarshipsService>(StarshipsService);
  });

  describe('single starship data', () => {
    it('should return mapped data', async () => {
      mockFetchWithCaching.mockReturnValue(starshipResponseMock);

      const result = await starshipsService.findOne(1);

      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple starships data', () => {
    it('should return mapped data', async () => {
      mockFetchWithCaching.mockReturnValue(starshipsResponseMock);

      const result = await starshipsService.findAll(1);

      expect(result).toMatchSnapshot();
    });
  });
});
