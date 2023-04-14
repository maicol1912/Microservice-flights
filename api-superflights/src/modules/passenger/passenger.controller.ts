import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/passenger.dto';

@Controller('api/v1/passenger')
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
