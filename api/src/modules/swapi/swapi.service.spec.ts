import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import {
  filmResponseMock,
  filmsResponseMock,
  planetResponseMock,
  planetsResponseMock,
  speciesResponseMock,
  speciesManyResponseMock,
  starshipResponseMock,
  starshipsResponseMock,
  vehicleResponseMock,
  vehiclesResponseMock,
} from '../../test/mocks/swapi';

import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let swapiService: SwapiService;

  const apiGetter = vi.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: apiGetter,
          },
        },
        SwapiService,
      ],
    }).compile();

    swapiService = module.get<SwapiService>(SwapiService);
  });

  describe('getVehicle', () => {
    it('should return valid vehicle data', async () => {
      apiGetter.mockReturnValue(of({ data: vehicleResponseMock }));

      const result = await swapiService.getVehicle(1);

      expect(result).toEqual(vehicleResponseMock);
    });

    it('should throw an error for invalid vehicle data', async () => {
      const wrongVehicleData = {};
      apiGetter.mockReturnValue(of({ data: wrongVehicleData }));

      const result = swapiService.getVehicle(1);

      await expect(result).rejects.toThrow();
    });
  });

  describe('getVehicles', () => {
    it('should return valid vehicles data', async () => {
      apiGetter.mockReturnValue(of({ data: vehiclesResponseMock }));

      const result = await swapiService.getVehicles();

      expect(result).toEqual(vehiclesResponseMock);
    });

    it('should throw an error for invalid vehicles data', async () => {
      const wrongVehiclesData = {};
      apiGetter.mockReturnValue(of({ data: wrongVehiclesData }));

      const result = swapiService.getVehicles();

      await expect(result).rejects.toThrow();
    });
  });

  describe('getFilm', () => {
    it('should return valid film data', async () => {
      apiGetter.mockReturnValue(of({ data: filmResponseMock }));

      const result = await swapiService.getFilm(1);

      expect(result).toEqual(filmResponseMock);
    });

    it('should throw an error for invalid film data', async () => {
      const wrongFilmData = {};
      apiGetter.mockReturnValue(of({ data: wrongFilmData }));

      const result = swapiService.getFilm(1);

      await expect(result).rejects.toThrow();
    });
  });

  describe('getFilms', () => {
    it('should return valid films data', async () => {
      apiGetter.mockReturnValue(of({ data: filmsResponseMock }));

      const result = await swapiService.getFilms();

      expect(result).toEqual(filmsResponseMock);
    });

    it('should throw an error for invalid films data', async () => {
      const wrongFilmsData = {};
      apiGetter.mockReturnValue(of({ data: wrongFilmsData }));

      const result = swapiService.getFilms();

      await expect(result).rejects.toThrow();
    });
  });

  describe('getStarship', () => {
    it('should return valid starship data', async () => {
      apiGetter.mockReturnValue(of({ data: starshipResponseMock }));

      const result = await swapiService.getStarship(1);

      expect(result).toEqual(starshipResponseMock);
    });

    it('should throw an error for invalid starship data', async () => {
      const wrongStarshipData = {};
      apiGetter.mockReturnValue(of({ data: wrongStarshipData }));

      const result = swapiService.getStarship(1);

      await expect(result).rejects.toThrow();
    });
  });

  describe('getStarships', () => {
    it('should return valid starships data', async () => {
      apiGetter.mockReturnValue(of({ data: starshipsResponseMock }));

      const result = await swapiService.getStarships();

      expect(result).toEqual(starshipsResponseMock);
    });

    it('should throw an error for invalid starships data', async () => {
      const wrongStarshipsData = {};
      apiGetter.mockReturnValue(of({ data: wrongStarshipsData }));

      const result = swapiService.getStarships();

      await expect(result).rejects.toThrow();
    });
  });

  describe('getPlanet', () => {
    it('should return valid planet data', async () => {
      apiGetter.mockReturnValue(of({ data: planetResponseMock }));

      const result = await swapiService.getPlanet(1);

      expect(result).toEqual(planetResponseMock);
    });

    it('should throw an error for invalid planet data', async () => {
      const wrongPlanetData = {};
      apiGetter.mockReturnValue(of({ data: wrongPlanetData }));

      const result = swapiService.getPlanet(1);

      await expect(result).rejects.toThrow();
    });
  });

  describe('getPlanets', () => {
    it('should return valid planets data', async () => {
      apiGetter.mockReturnValue(of({ data: planetsResponseMock }));

      const result = await swapiService.getPlanets();

      expect(result).toEqual(planetsResponseMock);
    });

    it('should throw an error for invalid planets data', async () => {
      const wrongPlanetsData = {};
      apiGetter.mockReturnValue(of({ data: wrongPlanetsData }));

      const result = swapiService.getPlanets();

      await expect(result).rejects.toThrow();
    });
  });

  describe('getSpecies', () => {
    it('should return valid spiecies data', async () => {
      apiGetter.mockReturnValue(of({ data: speciesResponseMock }));

      const result = await swapiService.getSpecies(1);

      expect(result).toEqual(speciesResponseMock);
    });

    it('should throw an error for invalid spiecies data', async () => {
      const wrongSpeciesData = {};
      apiGetter.mockReturnValue(of({ data: wrongSpeciesData }));

      const result = swapiService.getSpecies(1);

      await expect(result).rejects.toThrow();
    });
  });

  describe('getSpeciesMany', () => {
    it('should return valid many spiecies data', async () => {
      apiGetter.mockReturnValue(of({ data: speciesManyResponseMock }));

      const result = await swapiService.getSpeciesMany();

      expect(result).toEqual(speciesManyResponseMock);
    });

    it('should throw an error for invalid many spiecies data', async () => {
      const wrongSpeciesData = {};
      apiGetter.mockReturnValue(of({ data: wrongSpeciesData }));

      const result = swapiService.getSpeciesMany();

      await expect(result).rejects.toThrow();
    });
  });

  describe('error handling', () => {
    it('should throw error when HTTP request fails', async () => {
      apiGetter.mockImplementation(() => {
        throw new Error('Network error');
      });

      await expect(swapiService.getVehicle(1)).rejects.toThrow('Failed to get swapi resource');
    });
  });
});
