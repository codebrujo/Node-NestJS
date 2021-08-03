import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stock.controller';
import { StocksService } from './stock.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';

describe('StocksController', () => {
  let controller: StocksController;

  const mockStocksService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn().mockImplementation((dto, id) => {
      return {
        id,
        ...dto
      }
    }),
    delete: jest.fn().mockImplementation(id => {
      return {
        id,
      }
    }),
    getById: jest.fn().mockImplementation(id => {
      return {
        id,
      }
    }),
  };

  const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [passportModule],
      controllers: [StocksController],
      providers: [StocksService]
    }).overrideProvider(StocksService).useValue(mockStocksService).compile();

    controller = module.get<StocksController>(StocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a stock', () => {
    const mockDto = {
      ticker: 'TEST',
      title: 'Test title',
      price: 1
    };
    expect(controller.create(mockDto))
      .toEqual({
        id: expect.any(Number),
        ...mockDto
      });
    expect(mockStocksService.create).toBeCalledWith(mockDto);
  });

  it('should update a stock', () => {
    const mockDto = {
      ticker: 'TEST',
      title: 'Test title',
      price: 1
    };
    const id = '1';
    expect(controller.update(mockDto, id))
      .toEqual({
        id,
        ...mockDto
      });
    expect(mockStocksService.update).toBeCalledWith(mockDto, id);
  });

  it('should delete a stock', () => {
    const id = '1';
    expect(controller.remove(id))
      .toEqual({
        id,
      });
    expect(mockStocksService.delete).toBeCalledWith(id);
  });

  it('should get one stock', () => {
    const id = '1';
    expect(controller.getOne(id))
      .toEqual({
        id,
      });
    expect(mockStocksService.getById).toBeCalledWith(id);
  });


});
