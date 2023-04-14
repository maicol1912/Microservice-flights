import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports:[ProxyModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
