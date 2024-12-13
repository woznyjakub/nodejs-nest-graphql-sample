export const mappedVehicleMock = {
  cargoCapacity: '65',
  consumables: '2 days',
  costInCredits: 'unknown',
  crew: '1',
  starships: [
    'https://swapi.dev/api/starships/1/',
    'https://swapi.dev/api/starships/2/',
    'https://swapi.dev/api/starships/3/',
  ],
  length: '6.4',
  manufacturer: 'Sienar Fleet Systems',
  maxAtmospheringSpeed: '1200',
  model: 'Twin Ion Engine/Ln Starfighter',
  name: 'TIE/LN starfighter',
  passengers: '0',
  pilots: [],
  url: 'https://swapi.dev/api/vehicles/8/',
  vehicleClass: 'starfighter',
};

export const mappedVehiclesMock = {
  count: 39,
  next: 'https://swapi.dev/api/vehicles/?page=4',
  previous: 'https://swapi.dev/api/vehicles/?page=2',
  results: [
    {
      cargoCapacity: '200',
      consumables: 'none',
      costInCredits: '5750',
      crew: '1',
      starships: ['https://swapi.dev/api/starships/5/'],
      length: '3.68',
      manufacturer: 'Mobquet Swoops and Speeders',
      maxAtmospheringSpeed: '350',
      model: 'Zephyr-G swoop bike',
      name: 'Zephyr-G swoop bike',
      passengers: '1',
      pilots: ['https://swapi.dev/api/people/11/'],
      url: 'https://swapi.dev/api/vehicles/44/',
      vehicleClass: 'repulsorcraft',
    },
    {
      cargoCapacity: '80',
      consumables: 'unknown',
      costInCredits: 'unknown',
      crew: '1',
      starships: ['https://swapi.dev/api/starships/5/'],
      length: '6.6',
      manufacturer: 'Desler Gizh Outworld Mobility Corporation',
      maxAtmospheringSpeed: '800',
      model: 'Koro-2 Exodrive airspeeder',
      name: 'Koro-2 Exodrive airspeeder',
      passengers: '1',
      pilots: ['https://swapi.dev/api/people/70/'],
      url: 'https://swapi.dev/api/vehicles/45/',
      vehicleClass: 'airspeeder',
    },
  ],
};