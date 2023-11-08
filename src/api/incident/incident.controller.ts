import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { AdminGuard } from 'src/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Incident } from 'src/db';

@ApiTags('Incident')
@Controller('Incident')
export class IncidentController {
  constructor(private readonly eventService: IncidentService) { }

  @ApiOperation({ summary: 'create Incident' })
  @ApiResponse({ status: 201, type: Incident })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.eventService.create(createIncidentDto);
  }

  @ApiOperation({ summary: 'find all Incidents' })
  @ApiResponse({ status: 200, type: [Incident] })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'find one Incident' })
  @ApiResponse({ status: 200, type: Incident })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({ summary: 'update Incident' })
  @ApiResponse({ status: 200, type: Incident })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentDto: UpdateIncidentDto) {
    return this.eventService.update(+id, updateIncidentDto);
  }

  @ApiOperation({ summary: 'remove event' })
  @ApiResponse({ status: 200, description: 'return message about success' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
