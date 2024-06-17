import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Put,
  Query,
} from '@nestjs/common';
import { StarspayService } from './starspay.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CheckRequestDto,
  GetCpfInfoDto,
  MakePaymentDto,
  PaymentUpdateRequestDto,
} from 'src/common/dto/starspay.dto';

@ApiTags('StarspayController')
@Controller('starspay')
export class StarspayController {
  constructor(private readonly starspayService: StarspayService) {}

  @Get('get-balances-pix')
  async getAccountBalances() {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Account balances',
        data: await this.starspayService.getAccountBalances(),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('make-payment-pix')
  async makePayment(@Body() body: MakePaymentDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'make payment',
        data: await this.starspayService.makePayment(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update-payment-pix')
  async updatePayment(@Body() body: PaymentUpdateRequestDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'update payment',
        data: await this.starspayService.updatePayment(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-cpf-customer-pix')
  async getCpfInfo(@Body() body: GetCpfInfoDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get cpf customer',
        data: await this.starspayService.getCpfInfo(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-check-customer-pix')
  async performCheck(@Body() body: CheckRequestDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get cpf customer',
        data: await this.starspayService.performCheck(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-transaction-pix')
  @ApiQuery({ name: 'id', type: String })
  async getTransaction(@Query('id') id: string) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get transaction',
        data: await this.starspayService.getTransaction(id),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
