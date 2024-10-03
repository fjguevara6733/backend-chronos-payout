import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BindModule } from './bind/bind.module';
import { B89Module } from './B89/B89.module';
import { ArgentinaModule } from './argentina/argentina.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategyService } from './auth/jwt-strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ArgentinaModule,
    BindModule,
    B89Module,
    AuthModule,
    // TypeOrmModule.forRoot({
    //   name: 'chronos',
    //   type: 'mysql',
    //   host: process.env.POSTGRES_HOST,
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DB,
    //   port: Number(process.env.POSTGRES_PORT),
    //   autoLoadEntities: true,
    //   synchronize: false,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyService],
})
export class AppModule {}
