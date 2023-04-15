import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import {Observable} from "rxjs"
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightMSG, PassengerMSG } from 'src/common/constants/constants';

@Controller('api/v2/flight')
export class FlightsController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) { }
  private _clientProxyPassenger = this.clientProxy.clientProxyFlights();

  @Post()
  create(@Body() flightDto: FlightDto): Observable<IFlight> {
    //TODO SE ENVIA UNA ACCION DE TIPO CREATE Y SE ENVIA LA ENTIDAD A GUARDAR
    return this._clientProxyPassenger.send(FlightMSG.CREATE, flightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    //TODO SE HACE UN UN ENVIO DE UNA ACCION AL CLUSTER 
    return this._clientProxyPassenger.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    //TODO SE HACE UN ENVIO DE FINDONE Y ENVIAMOS EL ID DEL FLIGHT
    return this._clientProxyPassenger.send(FlightMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() flightDto: FlightDto): Observable<IFlight> {
    //TODO SE HACE UN ENVIO DE FINDONE Y ENVIAMOS EL ID DEL FLIGHT
    return this._clientProxyPassenger.send(FlightMSG.UPDATE, { id, flightDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    //TODO SE HACE UN ENVIO DE DELETE COMO ACCION Y ENVIAMOS EL ID DEL FLIGHT
    return this._clientProxyPassenger.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string){
    //TODO HACE LA CONSULTA DE FIND ONE POR MEDIO DE LAS COLAS
    const passenger =  this._clientProxyPassenger.send(PassengerMSG.FIND_ONE,passengerId).toPromise();
    if(!passenger) throw new HttpException('Passenger not found',HttpStatus.NOT_FOUND)
    //TODO HACE LA ACCION DE AGREGAR UN PASAJERO DESPUES EL ID DE FLIGHT Y EL DE PASSENGER
    return this._clientProxyPassenger.send(FlightMSG.ADD_PASSENGER,{flightId,passengerId})
  }

}