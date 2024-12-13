import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Species } from './species.entity';

@ObjectType()
export class SpeciesMany {
  @Field(() => Int)
  count: number;

  @Field(() => String, { nullable: true })
  next: string | null;

  @Field(() => String, { nullable: true })
  previous: string | null;

  @Field(() => [Species])
  results: Species[];
}
