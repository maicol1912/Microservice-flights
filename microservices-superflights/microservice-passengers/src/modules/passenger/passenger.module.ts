import { Global, Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { PASSENGER } from 'src/common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerSchema } from './schemas/passenger.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory:()=>{
          return PassengerSchema
        }
      }
    ])
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService]
})
export class PassengerModule {}
