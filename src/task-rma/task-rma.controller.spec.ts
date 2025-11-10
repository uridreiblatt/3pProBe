import { Test, TestingModule } from '@nestjs/testing';
import { TaskRmaController } from './task-rma.controller';
import { TaskRmaService } from './task-rma.service';

describe('TaskRmaController', () => {
  let controller: TaskRmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskRmaController],
      providers: [TaskRmaService],
    }).compile();

    controller = module.get<TaskRmaController>(TaskRmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
