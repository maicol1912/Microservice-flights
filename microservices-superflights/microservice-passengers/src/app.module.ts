import { Module } from '@nestjs/common';
import { PassengerModule } from './modules/passenger/passenger.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env.development'],
    isGlobal:true
  }),
  MongooseModule.forRoot(process.env.URI_MONGODB)
  ,PassengerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
