import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { SwapiService } from './swapi.service';
import {
  filmResponseMock,
  filmsResponseMock,
  vehicleResponseMock,
  vehiclesResponseMock,
} from './test/mocks';

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
    it('should return valid Film data', async () => {
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

  describe('error handling', () => {
    it('should throw error when HTTP request fails', async () => {
      apiGetter.mockImplementation(() => {
        throw new Error('Network error');
      });

      await expect(swapiService.getVehicle(1)).rejects.toThrow('Failed to get swapi resource');
    });
  });
});
