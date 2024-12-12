import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';

export class PlanetResponse {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  rotation_period: string;

  @Expose()
  @IsString()
  orbital_period: string;

  @Expose()
  @IsString()
  diameter: string;

  @Expose()
  @IsString()
  climate: string;

  @Expose()
  @IsString()
  gravity: string;

  @Expose()
  @IsString()
  terrain: string;

  @Expose()
  @IsString()
  surface_water: string;

  @Expose()
  @IsString()
  population: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  residents: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  films: string[];

  @Expose()
  @IsString()
  created: string;

  @Expose()
  @IsString()
  edited: string;

  @Expose()
  @IsString()
  url: string;
}

export class PlanetsResponse {
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
  @Type(() => PlanetResponse)
  results: PlanetResponse[];
}
