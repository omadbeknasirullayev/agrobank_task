import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressLocationDto } from './dto/create-addressLocation.dto';
import { UpdateAddressLocationDto } from './dto/update-addressLocation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressLocation } from 'src/db';
import { Repository } from 'typeorm';

@Injectable()
export class AddressLocationService {
  constructor(@InjectRepository(AddressLocation) private AddressLocationRepo: Repository<AddressLocation>) { }

  async create(createAddressLocationDto: CreateAddressLocationDto) {
    const loc: AddressLocation = this.AddressLocationRepo.create(createAddressLocationDto)
    return this.AddressLocationRepo.save(loc)
  }

  async findAll() {
    return this.AddressLocationRepo.find()
  }

  async findOne(id: number) {
    return this.AddressLocationRepo.findOne({ where: { id }, relations: ['incident'] })
  }

  async update(id: number, updateAddressLocationDto: UpdateAddressLocationDto) {
    const loc: AddressLocation = await this.AddressLocationRepo.findOne({ where: { id } })
    if (!loc)
      throw new HttpException('not found this AddressLocation', HttpStatus.BAD_REQUEST)

    loc.location = updateAddressLocationDto.location || loc.location
    loc.name = updateAddressLocationDto.name || loc.name

    await this.AddressLocationRepo.save(loc)
    return loc
  }

  async remove(id: number) {
    await this.AddressLocationRepo.delete(id)
    return { message: 'successfully removed' }
  }
}
