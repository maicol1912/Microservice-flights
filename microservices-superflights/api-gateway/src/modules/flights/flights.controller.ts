import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import {Observable} from "rxjs"
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightMSG } from 'src/common/constants/constants';

@Controller('api/v2/flight')
export class FlightsController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) { }
  private _clientProxyPassenger = this.clientProxy.clientProxyFlights();

  @Post()
  create(@Body() flightDto: FlightDto): Observable<IFlight> {
    return this._clientProxyPassenger.send(FlightMSG.CREATE, flightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyPassenger.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyPassenger.send(FlightMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightDto: FlightDto): Observable<IFlight> {
    return this._clientProxyPassenger.send(FlightMSG.UPDATE, { id, flightDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this._clientProxyPassenger.send(FlightMSG.DELETE, id);
  }
}
