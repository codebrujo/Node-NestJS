import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateStockDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly ticker: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
