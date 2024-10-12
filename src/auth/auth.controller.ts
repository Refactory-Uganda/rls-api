import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }) {
    const userData = await this.authService.validateUser(email, password);
    if (!userData) {
      return { message: 'Invalid credentials or external system error' };
    }
    return { tokens: userData.tokens };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    // Call AuthService to send the forgot password request to the external system
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string, // Token comes from query parameters (reset link)
    @Body('password') newPassword: string // New password from the request body
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
