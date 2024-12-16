import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

export type PagedResponse<Item> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
};

@Injectable()
export class StarWarsCommonService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async fetchWithCaching<T extends object>(
    cacheKey: string,
    getterFn: () => Promise<T>,
  ): Promise<T> {
    const cachedData = await this.cacheManager.get<T>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const data = await getterFn();
    await this.cacheManager.set(cacheKey, data);

    return data;
  }

  async getAllPages<T extends object>(
    cacheHandlerFn: (page: number) => string,
    getterFn: (page: number) => Promise<PagedResponse<T>>,
  ): Promise<T[]> {
    const limit = 25;
    let page = 1;

    const results: T[] = [];

    do {
      const data = await this.fetchWithCaching(cacheHandlerFn(page), () => getterFn(page));

      if (Array.isArray(data.results) || !results?.length) {
        results.push(...data.results);
      } else {
        break;
      }

      if (!data.next) {
        break;
      }
      page++;
    } while (page < limit);

    return results;
  }

  private buildCacheKey(
    resourceName: string,
    dataType: 'page' | 'id',
    value: string | number,
  ): string {
    return `swapi-${resourceName}-${dataType}-${value}`;
  }

  getVehicleCacheKey(id: number): string {
    return this.buildCacheKey('vehicle', 'id', id);
  }

  getVehiclesCacheKey(page: number): string {
    return this.buildCacheKey('vehicles', 'page', page);
  }

  getFilmCacheKey(id: number): string {
    return this.buildCacheKey('film', 'id', id);
  }

  getFilmsCacheKey(page: number): string {
    return this.buildCacheKey('films', 'page', page);
  }

  getStarshipCacheKey(id: number): string {
    return this.buildCacheKey('starship', 'id', id);
  }

  getStarshipsCacheKey(page: number): string {
    return this.buildCacheKey('starships', 'page', page);
  }

  getPlanetCacheKey(id: number): string {
    return this.buildCacheKey('planet', 'id', id);
  }

  getPlanetsCacheKey(page: number): string {
    return this.buildCacheKey('planets', 'page', page);
  }

  getSpeciesCacheKey(id: number): string {
    return this.buildCacheKey('species', 'id', id);
  }

  getSpeciesManyCacheKey(page: number): string {
    return this.buildCacheKey('speciesMany', 'page', page);
  }

  getPeopleCacheKey(page: number): string {
    return this.buildCacheKey('people', 'page', page);
  }
}
