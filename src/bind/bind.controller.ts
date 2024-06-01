import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { BindService } from './bind.service';
import { DoRequestDto } from 'src/common/dto/bind.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BindController')
@Controller()
export class BindController {
  constructor(private readonly bindService: BindService) {}

  @Post('do-request-bind')
  async doTransaction(@Body() body: DoRequestDto) {
    return await this.bindService.doTransaction(body);
  }

  @Get('get-customer-cuit/:cvu')
  async getCustomerCuit(@Param('cvu') cvu: string) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get-customer-cuit',
        data: await this.bindService.getCustomerCuit(cvu)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-customer-alias/:alias')
  async getCustomerAlias(@Param('alias') alias: string) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get-customer-cuit',
        data: await this.bindService.getCustomerAlias(alias)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
