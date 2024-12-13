import { Module } from '@nestjs/common';

import { StarWarsCommonModule } from '../star-wars-common/star-wars-common.module';
import { SwapiModule } from '../swapi/swapi.module';

import { SpeciesResolver } from './species.resolver';
import { SpeciesService } from './species.service';

@Module({
  imports: [SwapiModule, StarWarsCommonModule],
  providers: [SpeciesResolver, SpeciesService],
})
export class SpeciesModule {}
