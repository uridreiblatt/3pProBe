import { Test, TestingModule } from '@nestjs/testing';
import { OrderBoxesService } from './order-boxes.service';

describe('OrderBoxesService', () => {
  let service: OrderBoxesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderBoxesService],
    }).compile();

    service = module.get<OrderBoxesService>(OrderBoxesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
