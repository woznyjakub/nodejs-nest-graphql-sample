import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Vehicle } from './vehicle.model';

@ObjectType()
export class Vehicles {
  @Field(() => Int)
  count: number;

  @Field(() => String, { nullable: true })
  next: string | null;

  @Field(() => String, { nullable: true })
  previous: string | null;

  @Field(() => [Vehicle])
  results: Vehicle[];
}
