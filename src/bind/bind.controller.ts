import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { BindService } from './bind.service';
import { AliasDto, DoRequestDto, DoRequestDtoDebin } from 'src/common/dto/bind.dto';
import { ApiTags } from '@nestjs/swagger';
import { DefaultResponsesDto, ErrorResponseDto } from 'src/common/dto/response.dto';

@ApiTags('BindController')
@Controller('transaction')
export class BindController {
  constructor(private readonly bindService: BindService) { }

  @Post('send-transaction')
  async sendTransaction(@Body() payload: DoRequestDto): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      console.log("@Post('send-transaction')")
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'send Transaction',
        data: await this.bindService.doTransaction(payload)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-transaction')
  async getTransaction(@Body() payload: any): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Transaction',
        data: await this.bindService.getTransaction(payload)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-transaction/:id')
  async getTransactionById(@Param('id') id: string): Promise<DefaultResponsesDto | ErrorResponseDto> {
    console.log("@Get('get-transaction/:id')")
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Transaction by Id',
        data: await this.bindService.getTransactionByID(id)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-account/:cvu')
  async getAccount(@Param('cvu') cvu: string): Promise<DefaultResponsesDto | ErrorResponseDto> {
    console.log("@Get('get-account/:cvu')")
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Account by cvu',
        data: await this.bindService.getAccount(cvu)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('get-customer-alias')
  async getCustomerAlias(@Body() body: AliasDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get customer alias',
        data: await this.bindService.getCustomerAlias(body)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-account-balances')
  async getAccountBalances(){
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Account balances',
        data: await this.bindService.getAccountBalances()
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  // DEBIN
  @Post('transaction-debin')
  async sendTransactionDebin(@Body() payload: DoRequestDtoDebin): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'send Transaction',
        data: await this.bindService.doTransactionDebin(payload)
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-transaction-debin')
  async getTransactionDebin(@Body() payload: any): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Debin Transaction',
        data: await this.bindService.getTransactionDebin(payload)
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-transaction-debin/:id')
  async getTransactionDebinById(@Param('id') id: string): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Get Transaction Debin by Id',
        data: await this.bindService.getTransactionByIdDebin(id)
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('webhook')
  async webhook(@Body() payload: any): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Webhook registrado',
        data: await this.bindService.webhook(payload)
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('webhook')
  async Getwebhook(): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'listados Webhooks',
        data: await this.bindService.getWebhook()
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('webhook')
  async Deletewebhook(@Param('code') code: string): Promise<DefaultResponsesDto | ErrorResponseDto> {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Webhook eliminado',
        data: await this.bindService.deleteWebhook(code)
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
