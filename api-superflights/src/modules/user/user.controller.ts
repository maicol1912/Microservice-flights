import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  findAll(){
    return this.userService.findAll()
  } 

  @Get(':id')
  findOne(@Param('id')id:string){
    return this.userService.findOne(id)
  }

  @Put(':id')
  updateUser(@Param('id')id:string,@Body()userDto:UserDto){
    console.log("entre aca")
    return this.userService.update(id,userDto)
  }

  @Delete(':id')
  deleteUser(@Param('id')id:string){
    return this.userService.delete(id)
  }
}
