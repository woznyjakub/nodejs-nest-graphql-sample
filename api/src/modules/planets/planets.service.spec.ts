import { Test, TestingModule } from '@nestjs/testing';

import { planetResponseMock, planetsResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { PlanetsService } from './planets.service';

describe('PlanetsService', () => {
  let planetsService: PlanetsService;

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
      mockFetchWithCaching.mockReturnValue(planetResponseMock);

      const result = await planetsService.findOne(1);

      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple planets data', () => {
    it('should return mapped data when', async () => {
      mockFetchWithCaching.mockReturnValue(planetsResponseMock);

      const result = await planetsService.findAll(1);

      expect(result).toMatchSnapshot();
    });
  });
});
