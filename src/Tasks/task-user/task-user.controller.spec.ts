import { Test, TestingModule } from '@nestjs/testing';
import { TaskUserController } from './task-user.controller';
import { TaskUserService } from './task-user.service';

describe('TaskUserController', () => {
  let controller: TaskUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskUserController],
      providers: [TaskUserService],
    }).compile();

    controller = module.get<TaskUserController>(TaskUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
