import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FlightService } from './flight.service';
import { flightDto } from './dto/flight.dto';
import {UseGuards} from "@nestjs/common"
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/flight')
@UseGuards(JwtAuthGuard)
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  create(@Body() flightDto: flightDto) {
    return this.flightService.create(flightDto);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findById(@Param('id')id:string) {
    return this.flightService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightDto: flightDto){
    return this.flightService.update(id,flightDto)
  }

  @Delete(':id')
  remove(@Param('id')id:string){
    return this.flightService.remove(id)
  }

  @Post(':flightI/passenger/:idPassenger')
  addPassenger(@Param('flightI') flightId: string, @Param('idPassenger') idPassenger: string){
    return this.flightService.addPassenger(flightId,idPassenger)
  }
}
