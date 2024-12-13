import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

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
}
