import { Test, TestingModule } from '@nestjs/testing';
import { AxiosInterceptorService } from './axios-interceptor.service';

describe('AxiosInterceptorService', () => {
  let service: AxiosInterceptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosInterceptorService],
    }).compile();

    service = module.get<AxiosInterceptorService>(AxiosInterceptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
