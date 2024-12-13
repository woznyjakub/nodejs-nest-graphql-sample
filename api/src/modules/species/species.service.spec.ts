import { Test, TestingModule } from '@nestjs/testing';

import { speciesResponseMock, speciesManyResponseMock } from '../../test/mocks/swapi';
import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SwapiService } from '../swapi/swapi.service';

import { SpeciesService } from './species.service';

describe('SpeciesService', () => {
  let speciesManyService: SpeciesService;

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
      mockFetchWithCaching.mockReturnValue(speciesResponseMock);

      const result = await speciesManyService.findOne(1);

      expect(result).toMatchSnapshot();
    });
  });

  describe('multiple speciesMany data', () => {
    it('should return mapped data when', async () => {
      mockFetchWithCaching.mockReturnValue(speciesManyResponseMock);

      const result = await speciesManyService.findAll(1);

      expect(result).toMatchSnapshot();
    });
  });
});
