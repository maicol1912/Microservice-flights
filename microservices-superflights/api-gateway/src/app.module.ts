import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FlightsModule } from './modules/flights/flights.module';
import { PassengersModule } from './modules/passengers/passengers.module';
import { UserModule } from './modules/user/user.module';
import { ProxyModule } from './common/proxy/proxy.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env.development'],
    isGlobal:true
  }),
  FlightsModule,
  PassengersModule,
  UserModule,
  ProxyModule,
  AuthModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
