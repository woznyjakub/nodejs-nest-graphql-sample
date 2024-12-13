import { Module } from '@nestjs/common';

import { StarWarsCommonModule } from '../star-wars-common/star-wars-common.module';
import { SwapiModule } from '../swapi/swapi.module';

import { StarshipsResolver } from './starships.resolver';
import { StarshipsService } from './starships.service';

@Module({
  imports: [SwapiModule, StarWarsCommonModule],
  providers: [StarshipsResolver, StarshipsService],
})
export class StarshipsModule {}
