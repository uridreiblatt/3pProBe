import { Test, TestingModule } from '@nestjs/testing';
import { AllGrvController } from './all-grv.controller';
import { AllGrvService } from './all-grv.service';

describe('AllGrvController', () => {
  let controller: AllGrvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllGrvController],
      providers: [AllGrvService],
    }).compile();

    controller = module.get<AllGrvController>(AllGrvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
