import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';

@Module({
  controllers: [FlightsController],
  providers: []
})
export class FlightsModule {}
