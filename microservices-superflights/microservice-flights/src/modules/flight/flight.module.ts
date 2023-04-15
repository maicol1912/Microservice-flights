import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from '../../common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PASSENGER } from '../../common/models/models';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports:[MongooseModule.forFeatureAsync([
    {
      name:FLIGHT.name,
      useFactory:()=>{
        //TODO:SIRVE PARA RETORNAR TODA LA INFO DE PASAJEROS Y NO SOLAMENTE EL ID, TRAE LA INFO DEL OTRO DOCUMENTO
        return FlightSchema.plugin(require('mongoose-autopopulate'))
      }
    },
    {
      name: PASSENGER.name,
      useFactory: () => {
        //TODO:SIRVE PARA RETORNAR TODA LA INFO DE PASAJEROS Y NO SOLAMENTE EL ID, TRAE LA INFO DEL OTRO DOCUMENTO
        return PassengerSchema.plugin(require('mongoose-autopopulate'))
      }
    }
  ])
],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
