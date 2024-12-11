import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field()
  costInCredits: string;

  @Field()
  length: string;

  @Field()
  maxAtmospheringSpeed: string;

  @Field()
  crew: string;

  @Field()
  passengers: string;

  @Field()
  cargoCapacity: string;

  @Field()
  consumables: string;

  @Field()
  vehicleClass: string;

  @Field(() => [String])
  pilots: string[];

  @Field(() => [String])
  films: string[];

  @Field()
  url: string;
}
