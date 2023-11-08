import { Module } from '@nestjs/common';
import { AddressLocationService } from './addressLocation.service';
import { AddressLocationController } from './addressLocation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident, AddressLocation, User } from 'src/db';
import { JwtModule } from '@nestjs/jwt';
import { Utilities } from 'src/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([AddressLocation, User]), JwtModule],
  controllers: [AddressLocationController],
  providers: [AddressLocationService, Utilities],
})
export class AddressLocationModule { }
