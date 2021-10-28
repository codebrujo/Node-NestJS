import { ApiProperty } from '@nestjs/swagger';

import type { StockEntity } from '../stock.entity';

export class StockDto {
  @ApiProperty()
  readonly ticker: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly price: number;

  constructor(stock: StockEntity) {
    this.ticker = stock.ticker;
    this.title = stock.title;
    this.price = stock.price;
  }
}
