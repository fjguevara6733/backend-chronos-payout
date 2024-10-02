import { Module } from '@nestjs/common';
import { BindService } from './bind.service';
import { BindController } from './bind.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[
    ScheduleModule.forRoot()],
  controllers: [BindController],
  providers: [BindService],
  exports: [BindService],
})
export class BindModule {}
