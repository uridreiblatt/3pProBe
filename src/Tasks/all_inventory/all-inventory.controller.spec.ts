import { Test, TestingModule } from '@nestjs/testing';
import { AllInventoryController } from './all-inventory.controller';
import { AllInventoryService } from './all-inventory.service';

describe('AllInventoryController', () => {
  let controller: AllInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllInventoryController],
      providers: [AllInventoryService],
    }).compile();

    controller = module.get<AllInventoryController>(AllInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
