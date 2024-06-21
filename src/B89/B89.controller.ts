import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultResponsesDto, ErrorResponseDto } from 'src/common/dto/response.dto';
import { B89Service } from './B89.service';
import { AcceptQuoteDto, CreateOrderDto } from 'src/common/dto/b89.dto';

@ApiTags('B89Controller')
@Controller('b89')
export class B89Controller {
  constructor(private readonly b89Service: B89Service) { }

  @Post('sign-request')
  async signRequest(@Body() body: CreateOrderDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'sign request',
        data: await this.b89Service.signRequest(body)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('create-order')
  async createOrder(@Body() body: CreateOrderDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'create order',
        data: await this.b89Service.createOrder(body)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('accept-order')
  async acceptOrder(@Body() body: AcceptQuoteDto) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'accept order',
        data: await this.b89Service.acceptQuote(body)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-orders')
  async getOrders() {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get orders',
        data: await this.b89Service.getQuotes()
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-orders/:id')
  async getOrdersByOrderId(@Param('id') id: string) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get order by id',
        data: await this.b89Service.getQuotesByOrderId(id)
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-exchange')
  async getExchange(@Body() payload) {
    try {
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'get exchange',
        data: await this.b89Service.getExchange()
      };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
