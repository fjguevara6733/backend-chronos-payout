import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BindModule } from './bind/bind.module';
import { StarspayModule } from './starspay/starspay.module';

@Module({
  imports: [
    BindModule,
    StarspayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
