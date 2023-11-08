import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident, AddressLocation } from 'src/db';
import { Repository } from 'typeorm';

@Injectable()
export class IncidentService {
  constructor(@InjectRepository(Incident) private incidentRepo: Repository<Incident>) { }

  async create(createIncidentDto: CreateIncidentDto) {
    const loc: AddressLocation = new AddressLocation()
    loc.id = createIncidentDto.AddressLocation

    const incident: Incident = this.incidentRepo.create({ ...createIncidentDto, addressLocation: loc })
    return await this.incidentRepo.save(incident)
  }

  async findAll() {
    return await this.incidentRepo.find()
  }

  async findOne(id: number) {
    return await this.incidentRepo.findOne({ where: { id }, relations: ['location'] })
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto) {
    const incident: Incident = await this.incidentRepo.findOne({ where: { id } })
    if (!incident)
      throw new HttpException('no such incident', HttpStatus.BAD_REQUEST)

    incident.title = updateIncidentDto.title || incident.title
    incident.start = updateIncidentDto.start || incident.start
    incident.end = updateIncidentDto.end || incident.end

    if (updateIncidentDto.AddressLocation) {
      const loc: AddressLocation = new AddressLocation()
      loc.id = updateIncidentDto.AddressLocation
      incident.addressLocation = loc
    }
    return await this.incidentRepo.save(incident)
  }

  async remove(id: number) {
    await this.incidentRepo.delete(id)
    return { message: 'successfully removed' }
  }
}
