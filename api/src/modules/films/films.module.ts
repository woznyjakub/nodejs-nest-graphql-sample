import { Module } from '@nestjs/common';

import { StarWarsCommonModule } from '../star-wars-common/star-wars-common.module';
import { SwapiModule } from '../swapi/swapi.module';

import { FilmsResolver } from './films.resolver';
import { FilmsService } from './films.service';

@Module({
  imports: [SwapiModule, StarWarsCommonModule],
  providers: [FilmsResolver, FilmsService],
})
export class FilmsModule {}
