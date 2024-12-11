import { Module } from '@nestjs/common';

import { SwapiModule } from '../swapi/swapi.module';

import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [SwapiModule],
  providers: [VehiclesResolver, VehiclesService],
})
export class VehiclesModule {}
