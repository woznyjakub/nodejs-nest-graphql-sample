import { Injectable } from '@nestjs/common';

import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { StarshipResponse } from '../swapi/dto/starship';
import { SwapiService } from '../swapi/swapi.service';

import { Starship } from './entities/starship.entity';
import { Starships } from './entities/starships.entity';

@Injectable()
export class StarshipsService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly swCommonService: StarWarsCommonService,
  ) {}

  async findAll(page: number): Promise<Starships> {
    const swapiData = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getStarshipsCacheKey(page),
      () => this.swapiService.getStarships(page),
    );

    return {
      count: swapiData.count,
      next: swapiData.next,
      previous: swapiData.previous,
      results: swapiData.results.map(this.mapSingleStarship),
    };
  }

  async findOne(id: number): Promise<Starship> {
    const swapiData = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getStarshipCacheKey(id),
      () => this.swapiService.getStarship(id),
    );

    return this.mapSingleStarship(swapiData);
  }

  private mapSingleStarship(starship: StarshipResponse): Starship {
    return {
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      maxAtmospheringSpeed: starship.max_atmosphering_speed,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
      consumables: starship.consumables,
      hyperdriveRating: starship.hyperdrive_rating,
      MGLT: starship.MGLT,
      starshipClass: starship.starship_class,
      pilots: starship.pilots,
      films: starship.films,
      url: starship.url,
    };
  }
}
