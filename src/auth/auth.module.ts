import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JwtAutGuard.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'a1b2c3d4e5f6g7h8', // Define el secreto
      signOptions: { expiresIn: '15m' }, // Tiempo de expiración
    }),
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
