import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field(() => String)
  name: string;

  @Field(() => String)
  rotationPeriod: string;

  @Field(() => String)
  orbitalPeriod: string;

  @Field(() => String)
  diameter: string;

  @Field(() => String)
  climate: string;

  @Field(() => String)
  gravity: string;

  @Field(() => String)
  terrain: string;

  @Field(() => String)
  surfaceWater: string;

  @Field(() => String)
  population: string;

  @Field(() => [String])
  residents: string[];

  @Field(() => [String])
  films: string[];

  @Field(() => String)
  url: string;
}
