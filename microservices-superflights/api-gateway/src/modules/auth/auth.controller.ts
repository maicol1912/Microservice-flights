import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('signIn')
  async signIn(@Req() req){
    return await this.authService.signIn(req.body)
  }
  
  @Post('signUp')
  async singUp(@Body() UserDto:UserDto) {
    return await this.authService.signUp(UserDto)
  }

}
