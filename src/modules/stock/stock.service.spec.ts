import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StockEntity } from './stock.entity';
import { StocksService } from './stock.service';



describe('StockService', () => {
  let service: StocksService;

  const mockStocksRepository = {
    ticker: '',
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(stock => Promise.resolve({id: Date.now(), ...stock})),
    createQueryBuilder: jest.fn().mockImplementation(str => mockStocksRepository),
    where: jest.fn().mockImplementation(str => mockStocksRepository),
    setParameter: jest.fn().mockImplementation((str, str1) => {
      mockStocksRepository.ticker = str1;
      return mockStocksRepository;
    }),
    getOne: jest.fn().mockImplementation(() => {
      if (mockStocksRepository.ticker === existingDto.ticker) {
        return Promise.resolve({ id: Date.now(), ...existingDto })
      } else {
        return null;
      }
    }),
    findOne: jest.fn().mockImplementation(stock => Promise.resolve({id: Date.now(), ...existingDto})),
  }

  const mockHttpService = {
    get: jest.fn().mockImplementation(() => mockHttpService),
    toPromise: jest.fn().mockImplementation(() => Promise.resolve({
      data: {
        securities: {
          data: [[existingDto.ticker, existingDto.price]]
        }
      }
    })),
  }

  const newDto = {
    ticker: 'TEST',
    title: 'Test title',
    price: 1,
  }

  const existingDto = {
    ticker: 'EXIST',
    title: 'Test title',
    price: 1,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: getRepositoryToken(StockEntity),
          useValue: mockStocksRepository
        },
        {
          provide: HttpService,
          useValue: mockHttpService
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should create a new stock record and return that', async () => {
    
    expect(await service.create(newDto)).toEqual({
      id: expect.any(Number),
      ...newDto
    })

  })

  it('should update stock records', async () => {
    
    expect(await service.updateFromExternalService()).toEqual([{
      id: expect.any(Number),
      ...existingDto
    }])

  })


})