/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/create-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokendto } from './dto/refresh-token.dto';
import { User } from '@prisma/client';

interface AuthenticationRequest extends Request {
  user: User;
}

@Controller('authentication')
@ApiTags('Login and Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @ApiOperation({ summary: 'login in to RLS' })
  async login(@Body() dto: LoginDto) {
    return this.authenticationService.login(dto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'refresh token' })
  async refreshToken(@Body() dto: RefreshTokendto) {
    return this.authenticationService.refreshToken(dto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout from RLS' })
  async logout(@Req() req: AuthenticationRequest) {
    const userId = req.user.id;
    return this.authenticationService.logout(userId);
  }

  



}
