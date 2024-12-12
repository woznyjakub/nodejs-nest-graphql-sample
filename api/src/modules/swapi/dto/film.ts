import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';

export class FilmResponse {
  @Expose()
  @IsString()
  title: 'The Phantom Menace';

  @Expose()
  @IsNumber()
  episode_id: number;

  @Expose()
  @IsString()
  opening_crawl: string;

  @Expose()
  @IsString()
  director: 'George Lucas';

  @Expose()
  @IsString()
  producer: 'Rick McCallum';

  @Expose()
  @IsString()
  release_date: '1999-05-19';

  @Expose()
  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  species: string[];

  @Expose()
  @IsString()
  created: '2014-12-19T16:52:55.740000Z';

  @Expose()
  @IsString()
  edited: '2014-12-20T10:54:07.216000Z';

  @Expose()
  @IsString()
  url: 'https://swapi.dev/api/films/4/';
}

export class FilmsResponse {
  @Expose()
  @IsNumber()
  count: number;

  @Expose()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  next: string | null;

  @Expose()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  previous: string | null;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilmResponse)
  results: FilmResponse[];
}
