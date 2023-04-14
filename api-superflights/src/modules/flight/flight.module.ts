import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassengerModule } from '../passenger/passenger.module';
import { PassengerService } from '../passenger/passenger.service';

@Module({
  imports:[MongooseModule.forFeatureAsync([
    {
      name:FLIGHT.name,
      useFactory:()=>{
        //TODO:SIRVE PARA RETORNAR TODA LA INFO DE PASAJEROS Y NO SOLAMENTE EL ID, TRAE LA INFO DEL OTRO DOCUMENTO
        return FlightSchema.plugin(require('mongoose-autopopulate'))
      }
    }
  ]),
  PassengerModule //TODO: COMO ESTE MODULO USA EL MODULO DE PASSENGER TAMBIEN LO DEBEMOS IMPORTAR
],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
