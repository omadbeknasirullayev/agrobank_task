import { PartialType } from '@nestjs/swagger';
import { SigninUserDto } from './signin-user.dto';

export class UpdateUserDto extends PartialType(SigninUserDto) { }
