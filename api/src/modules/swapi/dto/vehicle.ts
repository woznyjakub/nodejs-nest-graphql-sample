import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateIf, ValidateNested } from 'class-validator';

export class VehicleResponse {
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  model: string;
  @Expose()
  @IsString()
  manufacturer: string;
  @Expose()
  @IsString()
  cost_in_credits: string;
  @Expose()
  @IsString()
  length: string;
  @Expose()
  @IsString()
  max_atmosphering_speed: string;
  @Expose()
  @IsString()
  crew: string;
  @Expose()
  @IsString()
  passengers: string;
  @Expose()
  @IsString()
  cargo_capacity: string;
  @Expose()
  @IsString()
  consumables: string;
  @Expose()
  @IsString()
  vehicle_class: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  pilots: string[];
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

export class VehiclesResponse {
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
  @Type(() => VehicleResponse)
  results: VehicleResponse[];
}
