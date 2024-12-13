import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Starship } from './starship.entity';

@ObjectType()
export class Starships {
  @Field(() => Int)
  count: number;

  @Field(() => String, { nullable: true })
  next: string | null;

  @Field(() => String, { nullable: true })
  previous: string | null;

  @Field(() => [Starship])
  results: Starship[];
}
