import { Test, TestingModule } from '@nestjs/testing';
import { AllInventoryService } from './all-inventory.service';
import { beforeEach, describe, it } from 'node:test';

describe('AllInventoryService', () => {
  let service: AllInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllInventoryService],
    }).compile();

    service = module.get<AllInventoryService>(AllInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
