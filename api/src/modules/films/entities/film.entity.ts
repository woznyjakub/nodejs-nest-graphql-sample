import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  episodeId: number;

  @Field(() => String)
  openingCrawl: string;

  @Field(() => String)
  director: string;

  @Field(() => String)
  producer: string;

  @Field(() => String)
  releaseDate: string;

  @Field(() => [String])
  characters: string[];

  @Field(() => [String])
  planets: string[];

  @Field(() => [String])
  starships: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field(() => [String])
  species: string[];

  @Field(() => String)
  url: string;
}
