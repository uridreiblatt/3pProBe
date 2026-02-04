import { Test, TestingModule } from '@nestjs/testing';
import { OrderBoxItemsController } from './order-box-items.controller';
import { OrderBoxItemsService } from './order-box-items.service';

describe('OrderBoxItemsController', () => {
  let controller: OrderBoxItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBoxItemsController],
      providers: [OrderBoxItemsService],
    }).compile();

    controller = module.get<OrderBoxItemsController>(OrderBoxItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
