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
        return FlightSchema.plugin(require('mongoose-autopopulate'))
      }
    }
  ]),
],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
