import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FlightService } from './flight.service';
import { flightDto } from './dto/flight.dto';
import { MessagePattern,Payload } from "@nestjs/microservices"
import { FlightMSG } from 'src/common/constants/constants';
@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() flightDto: flightDto) {
    return this.flightService.create(flightDto);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  findAll() {
    return this.flightService.findAll();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  findById(@Payload()id:string) {
    return this.flightService.findById(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload()payload:any){
    return this.flightService.update(payload.id,payload.flightDto)
  }

  @MessagePattern(FlightMSG.DELETE)
  remove(@Payload()id:string){
    return this.flightService.remove(id)
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(@Payload()payload: any){
    return this.flightService.addPassenger(payload.flightId,payload.passengerId)
  }
}
