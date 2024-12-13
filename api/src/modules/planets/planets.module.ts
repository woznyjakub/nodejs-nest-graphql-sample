import { Module } from '@nestjs/common';

import { StarWarsCommonModule } from '../star-wars-common/star-wars-common.module';
import { SwapiModule } from '../swapi/swapi.module';

import { PlanetsResolver } from './planets.resolver';
import { PlanetsService } from './planets.service';

@Module({
  imports: [SwapiModule, StarWarsCommonModule],
  providers: [PlanetsResolver, PlanetsService],
})
export class PlanetsModule {}
