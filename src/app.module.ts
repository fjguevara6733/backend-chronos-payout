import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BindModule } from './bind/bind.module';
import { B89Module } from './B89/B89.module';

@Module({
  imports: [
    BindModule,
    B89Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
