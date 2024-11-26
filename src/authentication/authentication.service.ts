/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/create-login.dto';
import axios from 'axios';
import { RefreshTokendto } from './dto/refresh-token.dto';

interface ApiEndpoints {
  admin: string;
  staff: string;
  student: string;
  user: string;
}
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  urlAdmin = 'https://rims-api-xufp.onrender.com/accounts/admin/login';
  urlStaff = 'https://rims-api-xufp.onrender.com/accounts/staff/login';
  urlStudent = 'https://rims-api-xufp.onrender.com/accounts/student/login';
  urlUser = 'https://rims-api-xufp.onrender.com/accounts/users/login';

  async login(dto: LoginDto) {
    const endpoints: ApiEndpoints = {
      admin: 'https://rims-api-xufp.onrender.com/accounts/admin/login',
      staff: 'https://rims-api-xufp.onrender.com/accounts/staff/login',
      student: 'https://rims-api-xufp.onrender.com/accounts/student/login',
      user: 'https://rims-api-xufp.onrender.com/accounts/users/login',
    };

    try {
      console.log('Starting');
      console.log(`starting ${dto.userGroup} login`);
      console.log('Login DTO:', dto);

      //  Select endpoint based on usertype
      let targetUrl: string;
      switch (dto.userGroup) {
        case 'Administrator':
          targetUrl = endpoints.admin;
          break;
        case 'Staff':
          targetUrl = endpoints.staff;
          break;
        case 'Student':
          targetUrl = endpoints.student;
          break;
        case 'User':
          targetUrl = endpoints.user;
          break;
        default:
          throw new HttpException('Invalid user group', HttpStatus.BAD_REQUEST);
      }

      const response = await axios.post(targetUrl, {
        email: dto.email,
        password: dto.password,
      });

      const { user: externalUser, tokens } = response.data;
      if (!externalUser || !tokens) {
        throw new HttpException(
          'Invalid response from external API',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      console.log('Received response from API:', externalUser);

      // find user
      let user = await this.prisma.user.findUnique({
        where: {
          email: externalUser.email.email,
        },
      });

      const userData = {
        externalId: externalUser.id,
        email: externalUser.email.email,
        firstName: externalUser.firstName,
        lastName: externalUser.lastName,
        userGroup: dto.userGroup,
        nationality: externalUser.nationality,
        residence: externalUser.residence,
        // refresh_token: tokens.refresh_token
      };

      if (!user) {
        console.log('creating new user');
        user = await this.prisma.user.create({
          data: userData,
        });
      } else {
        console.log('updating existing user');
        // update user
        user = await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: userData,
        });
      }

      // Generate Jwt Token
      const payload = {
        sub: user.id,
        email: user.email,
        userGroup: user.userGroup,
      };

      const access_token = this.jwtService.sign(payload, {
        expiresIn: '15m',
      });

      const refresh_token = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refresh_token },
      });

      // console.log('Received response: ', response.data)
      return {
        message: 'Login Successfully to RLS',
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userGroup: user.userGroup,
        },
        tokens: {
          access_token,
          refresh_token,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
        throw new UnauthorizedException('Illegal Alien');
      } else {
        console.error('Unexpected error:', error);
        throw new HttpException(
          'something isnot right',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async refreshToken(refreshToken: RefreshTokendto) {
    try {
      // find user with refresh token
      const user = await this.prisma.user.findFirst({
        where: { refresh_token: refreshToken.refresh_token },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // verify refresh token with rims
      try {
        const decoded = this.jwtService.verify(refreshToken.refresh_token);
        console.log('Decoded refresh token:', decoded);
      } catch (error) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { refresh_token: null },
        });
        console.error(error);
        throw new UnauthorizedException('Expired refresh token');
      }

      // generate new tokens
      const payload = {
        sub: user.id,
        email: user.email,
        userGroup: user.userGroup,
      };

      const access_token = this.jwtService.sign(payload, {
        expiresIn: '15m',
      });
      const new_refresh_token = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      // update user with new refresh token
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refresh_token: new_refresh_token },
      });

      return {
        access_token,
        refresh_token: new_refresh_token,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
        throw new UnauthorizedException('Invalid refresh token');
      } else {
        console.error('Unexpected error:', error);
        throw new HttpException(
          'something isnot right',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
