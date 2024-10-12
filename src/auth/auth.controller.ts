import { Controller, Post, Body } from '@nestjs/common';
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
    // This will return the user data along with tokens
    // return this.authService.login(userData);
    return { tokens: userData.tokens };
  }
}