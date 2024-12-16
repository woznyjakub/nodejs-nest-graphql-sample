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

  async getMostFrequentCharacterInFilms(): Promise<string[]> {
    const films = await this.swCommonService.getAllPages(
      this.swCommonService.getFilmsCacheKey,
      this.swapiService.getFilms,
    );

    const combinedOpeningCrawl = films
      .map((film) => film.opening_crawl)
      .join(' ')
      .toLowerCase();

    const people = await this.swCommonService.getAllPages(
      this.swCommonService.getPeopleCacheKey,
      this.swapiService.getPeople,
    );

    const characterOccurrences: Map<string, number> = new Map();

    people.forEach((person) => {
      // eslint-disable-next-line
      const regex = new RegExp(`\\b${person.name.toLowerCase()}\\b`, 'g'); // Dopasowanie całego słowa
      const matchCount = (combinedOpeningCrawl.match(regex) || []).length;

      if (matchCount > 0) {
        characterOccurrences.set(person.name, matchCount);
      }
    });

    const maxOccurrences = Math.max(...characterOccurrences.values());

    return Array.from(characterOccurrences.entries())
      .filter(([, count]) => count === maxOccurrences)
      .map(([name]) => name);
  }
}
