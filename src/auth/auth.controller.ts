/* eslint-disable prettier/prettier */
import { Controller, Post, Body /*UseGuards*/ } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('facilitator/login')
  @ApiOperation({ summary: 'Login for Facilitator' })
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Login for Admin' })
  async adminlogin(@Body() credentials: { email: string; password: string }) {
    return this.authService.adminlogin(credentials);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot Password' })
  async forgotPassword(@Body('email') email: string) {
    // Call AuthService to send the forgot password request to the external system
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset Password' })
  async resetPassword(
    @Body('token') token: string,
    @Body('password') newPassword: string, // New password from the request body
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
