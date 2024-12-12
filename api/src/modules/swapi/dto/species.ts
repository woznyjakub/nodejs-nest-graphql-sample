import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';

export class SpeciesResponse {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  classification: string;

  @Expose()
  @IsString()
  designation: string;

  @Expose()
  @IsString()
  average_height: string;

  @Expose()
  @IsString()
  skin_colors: string;

  @Expose()
  @IsString()
  hair_colors: string;

  @Expose()
  @IsString()
  eye_colors: string;

  @Expose()
  @IsString()
  average_lifespan: string;

  @Expose()
  @ValidateIf((_, v) => v !== null)
  @IsString()
  homeworld: string | null;

  @Expose()
  @IsString()
  language: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  people: string[];

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

export class SpeciesManyResponse {
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
  @Type(() => SpeciesResponse)
  results: SpeciesResponse[];
}
