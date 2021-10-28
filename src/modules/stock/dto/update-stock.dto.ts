import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStockDto {
  @ApiPropertyOptional()
  readonly ticker: string;

  @ApiPropertyOptional()
  readonly title: string;

  @ApiPropertyOptional()
  readonly price: number;
}
