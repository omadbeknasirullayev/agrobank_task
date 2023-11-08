import { PartialType } from '@nestjs/swagger';
import { CreateAddressLocationDto } from './create-addressLocation.dto';

export class UpdateAddressLocationDto extends PartialType(CreateAddressLocationDto) { }
