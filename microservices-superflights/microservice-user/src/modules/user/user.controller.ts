import { Controller, Get, Post, Body, Put, Param, Delete,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { MessagePattern,Payload} from "@nestjs/microservices"
import { UserMSG } from 'src/common/constants/constants';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //TODO: SE SUSCRIBE CADA QUE HAYA UN EVENTO DE ESTE TIPO, ENTONCES ESTE SE EJECUTA
  @MessagePattern(UserMSG.CREATE)
  //TODO: EL PAYLOAD ES EL TIPO DE DATO QUE LLEGA ES COMO UN BODY PERO EN MICROSERVICES
  create(@Payload() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  findAll(){
    return this.userService.findAll()
  } 

  @MessagePattern(UserMSG.FIND_ONE)
  //TODO: ES EL ID QUE LLEGA PARA FILTRAR LOS REGISTROS
  findOne(@Payload()id:string){
    return this.userService.findOne(id)
  }

  @MessagePattern(UserMSG.UPDATE)
  @Put(':id')
  updateUser(@Payload()payload:any){
    
    return this.userService.update(payload.id,payload.userDto)
  }

  @MessagePattern(UserMSG.DELETE)
  deleteUser(@Payload()id:string){
    return this.userService.delete(id)
  }

  @MessagePattern(UserMSG.VALID_USER)
  async validateUser(@Payload()payload:any){
    const user = await this.userService.findByUsername(payload.username)

    const isValidPassword = await this.userService.checkPassword(payload.password, user.password)

    if (user && isValidPassword) {
      return null
    }

  }
}
