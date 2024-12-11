import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { Vehicle } from './models/vehicle.model';
import { Vehicles } from './models/vehicles.model';
import { VehiclesService } from './vehicles.service';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => Vehicles, { name: 'vehicles' })
  findAll(@Args('page', { type: () => Int }) page: number): Promise<Vehicles> {
    return this.vehiclesService.findAll(page);
  }

  @Query(() => Vehicle, { name: 'vehicle' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
}
