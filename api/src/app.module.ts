import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { redisStore } from 'cache-manager-redis-yet';

import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';
import { FilmsModule } from './modules/films/films.module';
import { StarWarsCommonModule } from './modules/star-wars-common/star-wars-common.module';
import { StarshipsModule } from './modules/starships/starships.module';
import { SwapiModule } from './modules/swapi/swapi.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

import { AllExceptionsFilter } from '@common/filters/all-exceptions/all-exceptions.filter';
import { getConfig } from '@config/config';
import { ContextStorageModule } from '@context-storage/context-storage.module';
import { ContextStorageMiddleware } from '@context-storage/middleware/context-storage.middleware';
import { LoggerModule } from '@logger/logger.module';

const globalMiddlewares: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
];

const globalInterceptors: Provider[] = [];

@Module({
  imports: [
    LoggerModule,
    ContextStorageModule,
    SwapiModule,
    VehiclesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      include: [VehiclesModule, FilmsModule, StarshipsModule],
      autoSchemaFile: './src/schema.gql',
      sortSchema: true,
      debug: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const { cacheHost, cachePort } = getConfig();
        const store = await redisStore({
          socket: {
            host: cacheHost,
            port: cachePort,
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 1000 * 3600 * 24, // 24h
        };
      },
    }),
    FilmsModule,
    StarWarsCommonModule,
    StarshipsModule,
  ],
  controllers: [HelloWorldController],
  providers: [HelloWorldService, ...globalInterceptors, ...globalMiddlewares],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ContextStorageMiddleware).forRoutes('*');
  }
}
