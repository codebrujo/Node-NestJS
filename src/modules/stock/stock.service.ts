import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StockEntity } from './stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
  ) {}


  async getAll() {
    return await this.stockRepository.find();
  }

  async getById(id: string) {
    return await this.stockRepository.findOne(id);
  }

  async getByTicker(ticker: string) {
    return await this.stockRepository
      .createQueryBuilder('stocks')
      .where('stocks.ticker = :ticker')
      .setParameter('ticker', ticker)
      .getOne();
  }

  async create(payload: CreateStockDto) {
    const stock = await this.getByTicker(payload.ticker);

    if (stock) {
      throw new NotAcceptableException(
        'Stock with provided ticker already created.',
      );
    }
    return await this.stockRepository.save(this.stockRepository.create(payload));
  }

  async updateFromExternalService(payload: unknown[][]) {
    // const res = await Promise.all<Array<StockEntity>>(
    //   payload.reduce((result: any, item: [string, number]) => {
    //     result.push(async () =>
    //       {
    //         const stockItem = await this.stockRepository.findOne({ ticker: item[0] });
    //         console.log(stockItem);
    //         if (stockItem) {
    //           stockItem.price = item[1];
    //           await this.stockRepository.save(stockItem);
    //         }
    //         return stockItem;
    //       }
    //     );
    //     return result;
    //   }, [])
    // );
    const promiseArray = payload.map( async (item: [string, number]) => {
      const stockItem = await this.stockRepository.findOne({ ticker: item[0] });
      if (stockItem) {
        stockItem.price = item[1];
        await this.stockRepository.save(stockItem);
      }
      return stockItem;
    });

    return (await Promise.all(promiseArray)).reduce((result: any, item) => {
      if (item) {
        result.push(item);
      }
      return result;
    }, []);
  }

  async update(payload: UpdateStockDto, id: string) {
    const stock = await this.getById(id);
    
    if (!stock) {
      throw new NotAcceptableException(
        'Stock with provided id is not present.',
      );
    }
    
    return this.stockRepository.save({
      ...stock, // existing fields
      ...payload // updated fields
    });

  }

  async delete(id: string) {
    return await this.stockRepository
      .createQueryBuilder('stocks')
      .delete()
      .where("id = :id", { id })
      .execute();
  }

}
