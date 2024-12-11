import { Injectable } from '@nestjs/common';

import { VehicleResponse } from '../swapi/dto/vehicle';
import { SwapiService } from '../swapi/swapi.service';

import { Vehicle } from './models/vehicle.model';
import { Vehicles } from './models/vehicles.model';

@Injectable()
export class VehiclesService {
  constructor(private readonly swapiService: SwapiService) {}

  async findAll(page: number): Promise<Vehicles> {
    const swapiData = await this.swapiService.getVehicles(page);

    return {
      count: swapiData.count,
      next: swapiData.next,
      previous: swapiData.previous,
      results: swapiData.results.map(this.mapSingleVehicle),
    };
  }

  async findOne(id: number): Promise<Vehicle> {
    const swapiData = await this.swapiService.getVehicle(id);

    return this.mapSingleVehicle(swapiData);
  }

  private mapSingleVehicle(vehicle: VehicleResponse): Vehicle {
    return {
      name: vehicle.name,
      model: vehicle.model,
      manufacturer: vehicle.manufacturer,
      costInCredits: vehicle.cost_in_credits,
      length: vehicle.length,
      maxAtmospheringSpeed: vehicle.max_atmosphering_speed,
      crew: vehicle.crew,
      passengers: vehicle.passengers,
      cargoCapacity: vehicle.cargo_capacity,
      consumables: vehicle.consumables,
      vehicleClass: vehicle.vehicle_class,
      pilots: vehicle.pilots,
      films: vehicle.films,
      url: vehicle.url,
    };
  }
}