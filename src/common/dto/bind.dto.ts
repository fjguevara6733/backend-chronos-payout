import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DoRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destinationCbu: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idTransaction: string;
}

export class AliasDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alias: string;
}


export class DoRequestDtoDebin {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originCbu: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idTransaction: string;
}
