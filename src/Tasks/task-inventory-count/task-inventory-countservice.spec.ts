import { Test, TestingModule } from '@nestjs/testing';
import { TaskInventoryCountService } from './task-inventory-count.service';

describe('TaskInventoryCountService', () => {
  let service: TaskInventoryCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskInventoryCountService],
    }).compile();

    service = module.get<TaskInventoryCountService>(TaskInventoryCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
