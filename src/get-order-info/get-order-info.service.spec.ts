import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderInfoService } from './get-order-info.service';

describe('GetOrderInfoService', () => {
  let service: GetOrderInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrderInfoService],
    }).compile();

    service = module.get<GetOrderInfoService>(GetOrderInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
