import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Film } from './entities/film.entity';
import { Films } from './entities/films.entity';
import { FilmsService } from './films.service';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private readonly filmsService: FilmsService) {}

  @Query(() => Films, { name: 'films' })
  findAll(@Args('page', { type: () => Int }) page: number): Promise<Films> {
    return this.filmsService.findAll(page);
  }

  @Query(() => Film, { name: 'film' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Film> {
    return this.filmsService.findOne(id);
  }

  @Query(() => [[String, Number]], { name: 'filmsPlotDescriptionUniqueWordsCount' })
  getUniqueWordsCount(): Promise<[string, number][]> {
    return this.filmsService.getUniqueWordsCount();
  }
}
