# Node.js Star Wars GraphQL API

A simple GraphQL API built with Node.js that retrieves data from the [Star Wars API (SWAPI)](https://swapi.dev) and allows basic operations on the data.

## Technologies

Node.js (Nest.js), GraphQL, Docker, docker-compose, Redis, Vitest, Husky

The project was bootstaped with my own Nest.js starter [https://github.com/woznyjakub/nest-react-monorepo-rich-starter](https://github.com/woznyjakub/nest-react-monorepo-rich-starter)

## Prerequisites

- Docker (tested with v24.0.6)
- docker-compose (tested with v2.23.0-desktop.1)
- PNPM package manager (tested with 9.5.0)
- GNU Make (3.81, any other makefile handling program)

## Installation

- clone this repository

```
git clone https://github.com/woznyjakub/nodejs-nest-graphql-sample.git
```

- Copy file `api/.env.example` into `api/.env`

## Running the application

- Start the application by running command

```
make up
```

install local version of node_modules

```
cd /api
```

```
pnpm i
```

## Opening the GraphQL query playground

- The Apollo Studio Sandbox is available at [http://localhost:3000/graphql](http://localhost:3000/graphql).

## Running unit tests

```
cd /api
```

```
pnpm test
```

## Endpoints

The API's base url is http://localhost:3000/api

### Endpoints list

```
vehicle(id: $vehicleId)
vehicles(page: $vehiclePage)
film(id: $filmId)
films(page: $filmPage)
filmsPlotDescriptionUniqueWordsCount
filmsMostFrequentCharacterNameInFilmOpening - This endpoint has an issue probably related with Nest.js DI system and does not work at this point
starship(id: $starshipId)
starships(page: $starshipPage)
planet(id: $planetId)
planets(page: $planetPage)
species(id: $speciesId)
speciesMany(page: $speciesManyPage)
```

## Example Queries

```gql
query getAll($vehicleId: Int!, $vehiclePage: Int!, $filmId: Int!, $filmPage: Int!, $starshipId: Int!, $starshipPage: Int!, $planetId: Int!, $planetPage: Int!, $speciesId: Int!, $speciesManyPage: Int!) {
  vehicle(id: $vehicleId) {
      name
      cargoCapacity
    }
  vehicles(page: $vehiclePage) {
    count
    next
    previous
    results {
      name
      model
    }
  }

   film(id: $filmId) {
    title
    producer
    releaseDate
   }
   films(page: $filmPage) {
    count
    next
    previous
    results {
      title
      producer
      releaseDate
    }
   }

   starship(id: $starshipId) {
    name
    model
    starshipClass
   }
   starships(page: $starshipPage) {
    count
    next
    previous
    results {
      name
      model
      starshipClass
    }
   }

   planet(id: $planetId) {
    name
    rotationPeriod
    population
   }
   planets(page: $planetPage) {
    count
    next
    previous
    results {
      name
      rotationPeriod
      population
    }
   }

   species(id: $speciesId) {
    name
    classification
    language
    homeworld
   }
   speciesMany(page: $speciesManyPage) {
    count
    next
    previous
    results {
      name
      classification
      language
      homeworld
    }
   }
}

{
  "vehicleId": 4,
  "vehiclePage": 3,
  "filmId": 1,
  "filmPage": 1,
  "starshipId": 2,
  "starshipPage": 1,
  "planetId": 4,
  "planetPage": 1,
  "speciesId": 2,
  "speciesManyPage": 1,
}
```

```gql
query {
  filmsPlotDescriptionUniqueWordsCount
  filmsMostFrequentCharacterNameInFilmOpening
}
```
