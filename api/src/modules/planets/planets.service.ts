import { Injectable } from '@nestjs/common';

import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { PlanetResponse } from '../swapi/dto/planet';
import { SwapiService } from '../swapi/swapi.service';

import { Planet } from './entities/planet.entity';
import { Planets } from './entities/planets.entity';

@Injectable()
export class PlanetsService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly swCommonService: StarWarsCommonService,
  ) {}

  async findAll(page: number): Promise<Planets> {
    const cacheKey = `swapi-planets-page-${page}`;

    const swapiData = await this.swCommonService.fetchWithCaching(cacheKey, () =>
      this.swapiService.getPlanets(page),
    );

    return {
      count: swapiData.count,
      next: swapiData.next,
      previous: swapiData.previous,
      results: swapiData.results.map(this.mapSinglePlanet),
    };
  }

  async findOne(id: number): Promise<Planet> {
    const cacheKey = `swapi-planets-id-${id}`;

    const swapiData = await this.swCommonService.fetchWithCaching(cacheKey, () =>
      this.swapiService.getPlanet(id),
    );

    return this.mapSinglePlanet(swapiData);
  }

  private mapSinglePlanet(planet: PlanetResponse): Planet {
    return {
      name: planet.name,
      rotationPeriod: planet.rotation_period,
      orbitalPeriod: planet.orbital_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surfaceWater: planet.surface_water,
      population: planet.population,
      residents: planet.residents,
      films: planet.films,
      url: planet.url,
    };
  }
}
