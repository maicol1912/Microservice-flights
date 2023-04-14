import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';
import {Observable} from "rxjs"
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants/constants';
@Controller('api/v2/user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() userDto: UserDto):Observable<IUser>{
    return this._clientProxyUser.send(UserMSG.CREATE,userDto)
  }

  @Get()
  findAll():Observable<IUser[]>{
    return this._clientProxyUser.send(UserMSG.FIND_ALL,'')
  }

  @Get(':id')
  findOne(@Param('id')id:string): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '')
  }
}
