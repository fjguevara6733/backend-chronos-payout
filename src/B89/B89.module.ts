import { Module } from '@nestjs/common';
import { B89Controller } from './B89.controller';
import { B89Service } from './B89.service';

@Module({
  imports:[],
  controllers: [B89Controller],
  providers: [B89Service],
  exports: [B89Service],
})
export class B89Module {}
