import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => String)
  name: string;

  @Field(() => String)
  model: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  costInCredits: string;

  @Field(() => String)
  length: string;

  @Field(() => String)
  maxAtmospheringSpeed: string;

  @Field(() => String)
  crew: string;

  @Field(() => String)
  passengers: string;

  @Field(() => String)
  cargoCapacity: string;

  @Field(() => String)
  consumables: string;

  @Field(() => String)
  vehicleClass: string;

  @Field(() => [String])
  pilots: string[];

  @Field(() => [String])
  films: string[];

  @Field(() => String)
  url: string;
}
