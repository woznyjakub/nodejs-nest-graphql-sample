import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';
import { SwapiModule } from './modules/swapi/swapi.module';

import { AllExceptionsFilter } from '@common/filters/all-exceptions/all-exceptions.filter';
import { RequestLoggerInterceptor } from '@common/interceptors/request-logger/request-logger.interceptor';
import { ContextStorageModule } from '@context-storage/context-storage.module';
import { ContextStorageMiddleware } from '@context-storage/middleware/context-storage.middleware';
import { LoggerModule } from '@logger/logger.module';

const globalMiddlewares: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
];

const globalInterceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: RequestLoggerInterceptor,
  },
];

@Module({
  imports: [
    LoggerModule,
    ContextStorageModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // playground: getConfig().nodeEnv === NodeEnv.Dev,
      playground: false,
      // include:
      autoSchemaFile: './schema.gql',
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    SwapiModule,
  ],
  controllers: [HelloWorldController],
  providers: [HelloWorldService, ...globalInterceptors, ...globalMiddlewares],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ContextStorageMiddleware).forRoutes('*');
  }
}
