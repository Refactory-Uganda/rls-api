/* eslint-disable prettier/prettier */
import { Controller, Post, Body, /*UseGuards*/ } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard} from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common'; 

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('facilitator/login')
    async login(@Body() credentials: { email: string, password: string }) {
        return this.authService.login(credentials);
    }

    @Post('admin/login')
    async adminlogin(@Body() credentials: {email: string, password: string }) {
        return this.authService.adminlogin(credentials);
    }



  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    // Call AuthService to send the forgot password request to the external system
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string, 
    @Body('password') newPassword: string // New password from the request body
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
