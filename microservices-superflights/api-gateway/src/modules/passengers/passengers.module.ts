import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports:[ProxyModule],
  controllers: [PassengersController],
  providers: []
})
export class PassengersModule {}
