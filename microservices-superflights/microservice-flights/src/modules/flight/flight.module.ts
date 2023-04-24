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
        return FlightSchema.plugin(require('mongoose-autopopulate'))
      }
    },
    {
      name: PASSENGER.name,
      useFactory: () => {
        return PassengerSchema.plugin(require('mongoose-autopopulate'))
      }
    }
  ])
],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
