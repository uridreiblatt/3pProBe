import { Test, TestingModule } from '@nestjs/testing';
import { PartCqauntController } from './part-cqaunt.controller';
import { PartCqauntService } from './part-cqaunt.service';

describe('PartCqauntController', () => {
  let controller: PartCqauntController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartCqauntController],
      providers: [PartCqauntService],
    }).compile();

    controller = module.get<PartCqauntController>(PartCqauntController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
