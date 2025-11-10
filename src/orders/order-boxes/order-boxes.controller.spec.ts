import { Test, TestingModule } from '@nestjs/testing';
import { OrderBoxesController } from './order-boxes.controller';
import { OrderBoxesService } from './order-boxes.service';

describe('OrderBoxesController', () => {
  let controller: OrderBoxesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderBoxesController],
      providers: [OrderBoxesService],
    }).compile();

    controller = module.get<OrderBoxesController>(OrderBoxesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
