import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';
import { SwapiModule } from './modules/swapi/swapi.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

import { AllExceptionsFilter } from '@common/filters/all-exceptions/all-exceptions.filter';
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
      include: [VehiclesModule],
      autoSchemaFile: './src/schema.gql',
      sortSchema: true,
      debug: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [HelloWorldController],
  providers: [HelloWorldService, ...globalInterceptors, ...globalMiddlewares],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ContextStorageMiddleware).forRoutes('*');
  }
}
