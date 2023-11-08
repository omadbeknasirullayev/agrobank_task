import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident, AddressLocation, User } from 'src/db';
import { Utilities } from 'src/utils/utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, AddressLocation, User]), JwtModule],
  controllers: [IncidentController],
  providers: [IncidentService, Utilities],
})
export class IncidentModule { }
