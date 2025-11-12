import { Test, TestingModule } from '@nestjs/testing';
import { TaskRmaService } from './task-rma.service';

describe('TaskRmaService', () => {
  let service: TaskRmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRmaService],
    }).compile();

    service = module.get<TaskRmaService>(TaskRmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
