import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { FlightModule } from './modules/flight/flight.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true
  }), MongooseModule.forRoot(process.env.URI_MONGODB),
  UserModule,
  PassengerModule,
  FlightModule,
  AuthModule
],
  controllers: [],
  providers: [],
})
export class AppModule { }
