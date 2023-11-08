import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db';
import { JwtModule } from '@nestjs/jwt';
import { Utilities } from 'src/utils/utils';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule],
  controllers: [UserController],
  providers: [UserService, Utilities],
})
export class UserModule {}
