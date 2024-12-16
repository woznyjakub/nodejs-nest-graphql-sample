import { Injectable } from '@nestjs/common';

import { StarWarsCommonService } from '../star-wars-common/star-wars-common.service';
import { FilmResponse } from '../swapi/dto/film';
import { SwapiService } from '../swapi/swapi.service';

import { Film } from './entities/film.entity';
import { Films } from './entities/films.entity';

@Injectable()
export class FilmsService {
  constructor(
    private readonly swapiService: SwapiService,
    private readonly swCommonService: StarWarsCommonService,
  ) {}

  async findAll(page: number): Promise<Films> {
    const swapiData = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getFilmsCacheKey(page),
      () => this.swapiService.getFilms(page),
    );

    return {
      count: swapiData.count,
      next: swapiData.next,
      previous: swapiData.previous,
      results: swapiData.results.map(this.mapSingleFilm),
    };
  }

  async findOne(id: number): Promise<Film> {
    const swapiData = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getFilmCacheKey(id),
      () => this.swapiService.getFilm(id),
    );

    return this.mapSingleFilm(swapiData);
  }

  private mapSingleFilm(film: FilmResponse): Film {
    return {
      title: film.title,
      episodeId: film.episode_id,
      openingCrawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      releaseDate: film.release_date,
      characters: film.characters,
      planets: film.planets,
      starships: film.starships,
      vehicles: film.vehicles,
      species: film.species,
      url: film.url,
    };
  }

  async getUniqueWordsCount(): Promise<[string, number][]> {
    const { results: films } = await this.swCommonService.fetchWithCaching(
      this.swCommonService.getFilmsCacheKey(1),
      () => this.swapiService.getFilms(),
    );

    const wordCounts: Map<string, number> = new Map();

    films.forEach((film) => {
      const words = film.opening_crawl
        .split(/\W/)
        .filter((word) => word.trim() !== '')
        .map((word) => word.toLowerCase());

      words.forEach((word) => {
        const currentCount = wordCounts.get(word) || 0;
        wordCounts.set(word, currentCount + 1);
      });
    });

    return Array.from(wordCounts).sort((a, b) => b[1] - a[1]);
  }
}
