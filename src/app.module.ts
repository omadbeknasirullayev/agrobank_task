import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './api/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
