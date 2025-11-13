import { Test, TestingModule } from '@nestjs/testing';
import { AllRmaController } from './all-rma.controller';
import { AllRmaService } from './all-rma.service';

describe('AllRmaController', () => {
  let controller: AllRmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllRmaController],
      providers: [AllRmaService],
    }).compile();

    controller = module.get<AllRmaController>(AllRmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
