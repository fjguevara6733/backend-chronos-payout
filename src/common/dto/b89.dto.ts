import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({default: "USD"})
  @IsNotEmpty()
  @IsString()
  receivingCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sendingAmount: number;

  @ApiProperty({default: "PER"})
  @IsNotEmpty()
  @IsString()
  sendingCountry: string;

  @ApiProperty({default: "PEN"})
  @IsNotEmpty()
  @IsString()
  sendingCurrency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  receivingCountry: string;

  @ApiProperty({ default: 'BANK_TRANSFER_PER-PEN' })
  @IsNotEmpty()
  @IsString()
  sendingMethod: string;
}

class Customer {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  documentType: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentNumber: string;
}

class Beneficiary {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  secondLastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  documentType: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentNumber: string;
}

class BeneficiaryBankInfo {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}

export class AcceptQuoteDto {
  @ApiProperty()
  @IsString()
  quoteId: string;

  @ApiProperty()
  @ValidateNested()
  customer: Customer;

  @ApiProperty()
  @ValidateNested()
  beneficiary: Beneficiary;

  @ApiProperty()
  @ValidateNested()
  beneficiaryBankInfo: BeneficiaryBankInfo;
}
