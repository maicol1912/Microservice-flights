import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PassengerDto } from './dto/passenger.dto';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerMSG } from 'src/common/constants/constants';

@Controller('api/v2/passenger')
export class PassengersController {
  constructor(private readonly clientProxy:ClientProxySuperFlights) {}
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() passengerDto: PassengerDto):Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.CREATE,passengerDto);
  }

  @Get()
  findAll():Observable<IPassenger[]>{
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL,'');
  }

  @Get(':id')
  findOne(@Param('id') id: string):Observable<IPassenger>{
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE,id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passengerDto: PassengerDto):Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.UPDATE,{id,passengerDto});
  }

  @Delete(':id')
  remove(@Param('id') id: string):Observable<any>{
    return this._clientProxyPassenger.send(PassengerMSG.DELETE,id);
  }
}
