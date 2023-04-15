import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true
  }), MongooseModule.forRoot(process.env.URI_MONGODB),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
