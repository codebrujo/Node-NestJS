import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stock.controller';
import { StocksService } from './stock.service';
import { StockEntity } from './stock.entity';

export const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [passportModule, TypeOrmModule.forFeature([StockEntity]), HttpModule],
  providers: [StocksService],
  controllers: [StocksController],
})
export class StocksModule {}
