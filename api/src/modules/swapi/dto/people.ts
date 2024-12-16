import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';

export class PersonResponse {
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  height: string;
  @Expose()
  @IsString()
  mass: string;
  @Expose()
  @IsString()
  hair_color: string;
  @Expose()
  @IsString()
  skin_color: string;
  @Expose()
  @IsString()
  eye_color: string;
  @Expose()
  @IsString()
  birth_year: string;
  @Expose()
  @IsString()
  gender: string;
  @Expose()
  @IsString()
  homeworld: string;
  @Expose()
  @IsArray()
  @IsString({ each: true })
  films: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  species: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  starships: string[];

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

export class PeopleResponse {
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
  @Type(() => PersonResponse)
  results: PersonResponse[];
}
