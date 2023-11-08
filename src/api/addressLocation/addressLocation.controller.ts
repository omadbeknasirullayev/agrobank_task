import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressLocationService } from './addressLocation.service';
import { CreateAddressLocationDto } from './dto/create-addressLocation.dto';
import { UpdateAddressLocationDto } from './dto/update-addressLocation.dto';
import { AdminGuard } from 'src/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressLocation } from 'src/db';

@ApiTags('AddressLocations')
@Controller('AddressLocation')
export class AddressLocationController {
  constructor(private readonly AddressLocationService: AddressLocationService) { }

  @ApiOperation({ summary: 'create AddressLocation' })
  @ApiResponse({status: 201, type: AddressLocation})
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createAddressLocationDto: CreateAddressLocationDto) {
    return this.AddressLocationService.create(createAddressLocationDto);
  }

  @ApiOperation({ summary: 'find all AddressLocation' })
  @ApiResponse({ status: 200, type: [AddressLocation] })
  @Get()
  findAll() {
    return this.AddressLocationService.findAll();
  }

  @ApiOperation({ summary: 'find one AddressLocation' })
  @ApiResponse({ status: 200, type: AddressLocation })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AddressLocationService.findOne(+id);
  }

  @ApiOperation({ summary: 'update AddressLocation' })
  @ApiResponse({ status: 200, type: AddressLocation })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressLocationDto: UpdateAddressLocationDto) {
    return this.AddressLocationService.update(+id, updateAddressLocationDto);
  }

  @ApiOperation({ summary: 'remove AddressLocation' })
  @ApiResponse({ status: 200, description: 'return message about success' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AddressLocationService.remove(+id);
  }
}


