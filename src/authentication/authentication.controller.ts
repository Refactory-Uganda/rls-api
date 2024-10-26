/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGaurd } from './jwt-auth.guard';
import { LoginDto } from './dto/create-login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginDto:LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authenticationService.validateUser(email, password);
    if(!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authenticationService.login(user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
