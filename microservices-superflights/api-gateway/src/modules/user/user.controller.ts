import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';
import {Observable} from "rxjs"
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
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
  findOne(@Param('id')id:string): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE,id)
  }

  @Put(':id')
  update(@Param('id') id: string,@Body()userDto:UserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, {id,userDto})
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE,id)
  }
}
