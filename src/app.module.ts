import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BindModule } from './bind/bind.module';
import { B89Module } from './B89/B89.module';
import { ArgentinaModule } from './argentina/argentina.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategyService } from './auth/jwt-strategy.service';
@Module({
  imports: [
    ArgentinaModule,
    BindModule,
    B89Module,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyService],
})
export class AppModule {}
