import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { lastValueFrom } from 'rxjs';

import { FilmResponse, FilmsResponse } from './dto/film';
import { PeopleResponse } from './dto/people';
import { PlanetResponse, PlanetsResponse } from './dto/planet';
import { SpeciesManyResponse, SpeciesResponse } from './dto/species';
import { StarshipResponse, StarshipsResponse } from './dto/starship';
import { VehicleResponse, VehiclesResponse } from './dto/vehicle';

@Injectable()
export class SwapiService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://swapi.dev/api';

  private async getResource<T extends object>(
    name: string,
    dto: ClassConstructor<T>,
    id?: number,
    page?: number,
  ): Promise<T> {
    const url = `${this.baseUrl}/${name}${id ? `/${id}` : ''}`;
    const params = !id && page ? { page } : null;

    try {
      const response = await lastValueFrom(this.httpService.get(url, { params }));
      const resourceData: unknown = response.data;

      const resource = plainToInstance<T, unknown>(dto, resourceData, {
        enableImplicitConversion: true,
        excludeExtraneousValues: true,
      });

      const errors = await validate(resource);
      if (errors.length > 0) {
        throw new Error(
          `Swapi resource validation failed: ${errors.map((e) => e.toString()).join(', ')}`,
        );
      }

      return resource;
    } catch (error) {
      throw new HttpException(
        `Failed to get swapi resource (${name}). Error: ${error.message}`,
        error.status,
      );
    }
  }

  getVehicle(id: number): Promise<VehicleResponse> {
    return this.getResource('vehicles', VehicleResponse, id);
  }

  getVehicles(page: number = 1): Promise<VehiclesResponse> {
    return this.getResource('vehicles', VehiclesResponse, undefined, page);
  }

  getFilm(id: number): Promise<FilmResponse> {
    return this.getResource('films', FilmResponse, id);
  }

  getFilms(page: number = 1): Promise<FilmsResponse> {
    return this.getResource('films', FilmsResponse, undefined, page);
  }

  getStarship(id: number): Promise<StarshipResponse> {
    return this.getResource('starships', StarshipResponse, id);
  }

  getStarships(page: number = 1): Promise<StarshipsResponse> {
    return this.getResource('starships', StarshipsResponse, undefined, page);
  }

  getPlanet(id: number): Promise<PlanetResponse> {
    return this.getResource('planets', PlanetResponse, id);
  }

  getPlanets(page: number = 1): Promise<PlanetsResponse> {
    return this.getResource('planets', PlanetsResponse, undefined, page);
  }

  getSpecies(id: number): Promise<SpeciesResponse> {
    return this.getResource('species', SpeciesResponse, id);
  }

  getSpeciesMany(page: number = 1): Promise<SpeciesManyResponse> {
    return this.getResource('species', SpeciesManyResponse, undefined, page);
  }

  getPeople(page: number = 1): Promise<PeopleResponse> {
    return this.getResource('people', PeopleResponse, undefined, page);
  }
}
