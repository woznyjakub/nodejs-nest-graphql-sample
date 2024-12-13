import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Planet } from './planet.entity';

@ObjectType()
export class Planets {
  @Field(() => Int)
  count: number;

  @Field(() => String, { nullable: true })
  next: string | null;

  @Field(() => String, { nullable: true })
  previous: string | null;

  @Field(() => [Planet])
  results: Planet[];
}
