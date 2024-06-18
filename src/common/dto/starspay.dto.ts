import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { partnerOrderGroup } from '../utils/enum';

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

  @ApiProperty({enum: partnerOrderGroup, description: "1 para Brasil y 12 para Peru"})
  @IsNumber()
  @IsNotEmpty()
  partner_order_group: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  partner_success_url: string;
}

export class PrizepoolRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_user_uid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_user_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_user_email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_user_document: string;

  @ApiProperty()
  @IsNotEmpty()
  partner_user_birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_user_zipcode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_user_mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_order_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_order_amount: string;

  @ApiProperty({enum: partnerOrderGroup, description: "1 para Brasil y 12 para Peru"})
  @IsNotEmpty()
  @IsNumber()
  partner_order_group: number;

  @ApiProperty({description: "Usar para Brasil"})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  partner_withdraw_pixtype: string;

  @ApiProperty({description: "Usar para Brasil"})
  @IsNotEmpty()
  @IsString()
  partner_withdraw_pixkey: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  partner_withdraw_pwd: string;

  @ApiProperty({description: "Usar para Peru"})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  partner_withdraw_cci:string;

  @ApiProperty({description: "Usar para Peru", default: "CUENTA"})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  partner_withdraw_account_type: string;

  @ApiProperty({description: "Usar para Peru"})
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  partner_withdraw_account:string;
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