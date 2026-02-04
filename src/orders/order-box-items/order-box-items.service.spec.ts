import { Test, TestingModule } from '@nestjs/testing';
import { OrderBoxItemsService } from './order-box-items.service';

describe('OrderBoxItemsService', () => {
  let service: OrderBoxItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBoxItemsService],
    }).compile();

    service = module.get<OrderBoxItemsService>(OrderBoxItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
