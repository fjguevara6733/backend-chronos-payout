import { Module } from '@nestjs/common';
import { StarspayService } from './starspay.service';
import { StarspayController } from './starspay.controller';

@Module({
  controllers: [StarspayController],
  providers: [StarspayService],
})
export class StarspayModule {}
