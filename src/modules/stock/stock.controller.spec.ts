import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stock.controller';

describe('StocksController', () => {
  let controller: StocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
    }).compile();

    controller = module.get<StocksController>(StocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
