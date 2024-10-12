import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

import { AuthController } from './auth.controller';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'ab6bef6fbe59088a526012fb2f28a02640242cade99f56a597ca52be70f662a3',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
