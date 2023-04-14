import { Controller, Get, Post, Body, Put, Param, Delete,UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(){
    return this.userService.findAll()
  } 

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id')id:string){
    return this.userService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id')id:string,@Body()userDto:UserDto){
    console.log("entre aca")
    return this.userService.update(id,userDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id')id:string){
    return this.userService.delete(id)
  }
}
