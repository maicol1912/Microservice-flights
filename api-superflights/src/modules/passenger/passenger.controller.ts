import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/passenger.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/passenger')
@UseGuards(JwtAuthGuard)
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDto: PassengerDto) {
    return this.passengerService.create(passengerDto);
  }

  @Get()
  findAll(){
    return this.passengerService.findAll()
  }

  @Get(':id')
  findOne(@Param('id')id:string){
    return this.passengerService.findOne(id)
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() passengerDto: PassengerDto) {
    console.log("entre aca")
    return this.passengerService.update(id, passengerDto)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.passengerService.delete(id)
  }
}
