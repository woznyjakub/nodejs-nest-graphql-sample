import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field(() => String)
  name: string;

  @Field(() => String)
  classification: string;

  @Field(() => String)
  designation: string;

  @Field(() => String)
  averageHeight: string;

  @Field(() => String)
  skinColors: string;

  @Field(() => String)
  hairColors: string;

  @Field(() => String)
  eyeColors: string;

  @Field(() => String)
  averageLifespan: string;

  @Field(() => String, { nullable: true })
  homeworld: string | null;

  @Field(() => String)
  language: string;

  @Field(() => [String])
  people: string[];

  @Field(() => [String])
  films: string[];

  @Field(() => String)
  url: string;
}
