import { Test, TestingModule } from '@nestjs/testing';
import { TaskInventoryCountController } from './task-inventory-count.controller';
import { TaskInventoryCountService } from './task-inventory-count.service';

describe('TaskInventoryCountController', () => {
  let controller: TaskInventoryCountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskInventoryCountController],
      providers: [TaskInventoryCountService],
    }).compile();

    controller = module.get<TaskInventoryCountController>(TaskInventoryCountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
