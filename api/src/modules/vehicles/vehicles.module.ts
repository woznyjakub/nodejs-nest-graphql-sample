import { Module } from '@nestjs/common';

import { StarWarsCommonModule } from '../star-wars-common/star-wars-common.module';
import { SwapiModule } from '../swapi/swapi.module';

import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [SwapiModule, StarWarsCommonModule],
  providers: [VehiclesResolver, VehiclesService],
})
export class VehiclesModule {}
