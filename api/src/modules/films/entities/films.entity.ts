import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Film } from './film.entity';

@ObjectType()
export class Films {
  @Field(() => Int)
  count: number;

  @Field(() => String, { nullable: true })
  next: string | null;

  @Field(() => String, { nullable: true })
  previous: string | null;

  @Field(() => [Film])
  results: Film[];
}
