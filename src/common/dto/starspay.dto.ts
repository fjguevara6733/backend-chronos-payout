import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetCpfInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  cpf: string;
}

export class MakePaymentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  partner_user_uid: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_user_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_user_email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_user_document: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  partner_user_birthday: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_user_mobile: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_order_number: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  partner_order_amount: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  partner_order_group: number;
}

export class CheckRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_user_uid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_user_document: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_order_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner_order_amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  order_token: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order_operation_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order_status_id: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  order_created_at: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  order_valid_at: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  order_updated_at: string;
}

export class PaymentUpdateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_order_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  status_id: number;
}