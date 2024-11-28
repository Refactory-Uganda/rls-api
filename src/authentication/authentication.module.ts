/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGaurd } from './guards/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { issuer: 'rls-api' },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, RolesGaurd],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
