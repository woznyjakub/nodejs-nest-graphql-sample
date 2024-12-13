import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Planet } from './entities/planet.entity';
import { Planets } from './entities/planets.entity';
import { PlanetsService } from './planets.service';

@Resolver(() => Planet)
export class PlanetsResolver {
  constructor(private readonly vehiclesService: PlanetsService) {}

  @Query(() => Planets, { name: 'planets' })
  findAll(@Args('page', { type: () => Int }) page: number): Promise<Planets> {
    return this.vehiclesService.findAll(page);
  }

  @Query(() => Planet, { name: 'planet' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Planet> {
    return this.vehiclesService.findOne(id);
  }
}
