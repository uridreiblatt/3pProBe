import { Test, TestingModule } from '@nestjs/testing';
import { PriorityProductsController } from './priorityProducts.controller';
import { priorityProductsService } from './priorityProducts.service';

describe('PartsController', () => {
  let controller: PriorityProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityProductsController],
      providers: [priorityProductsService],
    }).compile();

    controller = module.get<PriorityProductsController>(
      PriorityProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
