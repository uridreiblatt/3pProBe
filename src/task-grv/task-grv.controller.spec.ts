import { Test, TestingModule } from '@nestjs/testing';
import { TaskGrvController } from './task-grv.controller';
import { TaskGrvService } from './task-grv.service';

describe('TaskGrvController', () => {
  let controller: TaskGrvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskGrvController],
      providers: [TaskGrvService],
    }).compile();

    controller = module.get<TaskGrvController>(TaskGrvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
