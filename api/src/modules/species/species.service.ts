import { Injectable } from '@nestjs/common';

import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { SpeciesResponse } from '../swapi/dto/species';
import { SwapiService } from '../swapi/swapi.service';

import { SpeciesMany } from './entities/species-many.entity';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly swCommonService: StarWarsCommonService,
  ) {}

  async findAll(page: number): Promise<SpeciesMany> {
    const swapiData = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getSpeciesManyCacheKey(page),
      () => this.swapiService.getSpeciesMany(page),
    );

    return {
      count: swapiData.count,
      next: swapiData.next,
      previous: swapiData.previous,
      results: swapiData.results.map(this.mapSingleSpecies),
    };
  }

  async findOne(id: number): Promise<Species> {
    const swapiData = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getSpeciesCacheKey(id),
      () => this.swapiService.getSpecies(id),
    );

    return this.mapSingleSpecies(swapiData);
  }

  private mapSingleSpecies(species: SpeciesResponse): Species {
    return {
      name: species.name,
      classification: species.classification,
      designation: species.designation,
      averageHeight: species.average_height,
      skinColors: species.skin_colors,
      hairColors: species.hair_colors,
      eyeColors: species.eye_colors,
      averageLifespan: species.average_lifespan,
      homeworld: species.homeworld,
      language: species.language,
      people: species.people,
      films: species.films,
      url: species.url,
    };
  }
}
