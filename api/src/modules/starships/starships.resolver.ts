import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Starship } from './entities/starship.entity';
import { Starships } from './entities/starships.entity';
import { StarshipsService } from './starships.service';

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(private readonly vehiclesService: StarshipsService) {}

  @Query(() => Starships, { name: 'starships' })
  findAll(@Args('page', { type: () => Int }) page: number): Promise<Starships> {
    return this.vehiclesService.findAll(page);
  }

  @Query(() => Starship, { name: 'starship' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Starship> {
    return this.vehiclesService.findOne(id);
  }
}
