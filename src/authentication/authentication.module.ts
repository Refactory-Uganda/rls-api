/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGaurd } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    HttpModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, RolesGaurd],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
