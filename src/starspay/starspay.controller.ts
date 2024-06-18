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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  GetCpfInfoDto,
  MakePaymentDto,
  PaymentUpdateRequestDto,
  PrizepoolRequestDto,
} from 'src/common/dto/starspay.dto';

@ApiTags('StarspayController')
@Controller('starspay')
export class StarspayController {
  constructor(private readonly starspayService: StarspayService) {}

  @Get('get-balances')
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

  @Post('make-payment')
  @ApiOperation({
    summary: 'Crear un pago (cash in)',
    description: 'partner_order_group (1 para Brasil, 12 para Peru), agregar partner_success_url para redireccionamiento con Peru',
  })
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

  @Put('update-payment')
  @ApiOperation({
    summary: 'Actualización de un pago (cash in)',
    description: 'estatus posibles 3 y 4 para cancelaciones y 7 para pagos concretados con exito',
  })
  async updatePayment(@Body() body: PaymentUpdateRequestDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'update payment',
        data: await this.starspayService.updateTransaction(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-cpf-customer')@ApiQuery({ name: 'id', type: String })@ApiOperation({
    summary: 'Ver información de un cliente',
    description: 'cpf seria el numero de documento del cliente',
  })
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

  @Post('make-prizepool')
  @ApiOperation({
    summary: 'Crear un pago (cash out)',
    description: `partner_order_group (1 para Brasil, 12 para Peru).
    Para Brasil (partner_withdraw_pixtype, partner_withdraw_pixkey).
    Para Peru (partner_withdraw_cci, partner_withdraw_account_type dejar valor por defecto, partner_withdraw_account)`,
  })
  async prizepoolRequest(@Body() body: PrizepoolRequestDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'cash out customer',
        data: await this.starspayService.prizepoolRequest(body),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('update-prizepool')
  @ApiOperation({
    summary: 'Actualización de un pago (cash out)',
    description: 'estatus posibles 3 y 4 para cancelaciones y 7 para pagos concretados con exito',
  })
  async updatePrizepool(@Body() body: PaymentUpdateRequestDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'update cash out',
        data: await this.starspayService.updateTransaction(body, false),
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-transaction')
  @ApiQuery({ name: 'id', type: String })@ApiOperation({
    summary: 'Ver información de una transacción (cash in o cash out)',
    description: 'estatus posibles 3 y 4 para cancelaciones y 7 para pagos concretados con exito',
  })
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
