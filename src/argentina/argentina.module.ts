import { Module } from '@nestjs/common';
import { ArgentinaController } from './argentina.controller';
import { BindModule } from 'src/bind/bind.module';
import { JwtAuthGuard } from 'src/auth/JwtAutGuard.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [BindModule, AuthModule],
  controllers: [ArgentinaController],
  providers: [JwtAuthGuard]
})
export class ArgentinaModule {}
