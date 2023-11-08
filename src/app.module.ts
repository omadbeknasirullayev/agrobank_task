import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './api/user/user.module';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AddressLocationModule } from './api/addressLocation/addressLocation.module';
import { IncidentModule } from './api/incident/incident.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),

    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: 'schema.gql'
    // }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: TypeOrmConfig,
      inject: [ConfigService],
    }),

    UserModule,

    AddressLocationModule,

    IncidentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
