import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { SpeciesMany } from './entities/species-many.entity';
import { Species } from './entities/species.entity';
import { SpeciesService } from './species.service';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly vehiclesService: SpeciesService) {}

  @Query(() => SpeciesMany, { name: 'speciesMany' })
  findAll(@Args('page', { type: () => Int }) page: number): Promise<SpeciesMany> {
    return this.vehiclesService.findAll(page);
  }

  @Query(() => Species, { name: 'species' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Species> {
    return this.vehiclesService.findOne(id);
  }
}
