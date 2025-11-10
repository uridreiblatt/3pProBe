import { Test, TestingModule } from '@nestjs/testing';
import { TaskGrvService } from './task-grv.service';

describe('TaskGrvService', () => {
  let service: TaskGrvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskGrvService],
    }).compile();

    service = module.get<TaskGrvService>(TaskGrvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
