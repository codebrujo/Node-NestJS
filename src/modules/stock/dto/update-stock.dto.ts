import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStockDto {
  @ApiPropertyOptional()
  readonly title: string;

  @ApiPropertyOptional()
  readonly price: number;
}
