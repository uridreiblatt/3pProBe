import { Test, TestingModule } from '@nestjs/testing';
import { PartsHierarchyController } from './priority-products-hierarchy.controller';
import { PartsHierarchyService } from './priority-products-hierarchy.service';

describe('PartsHierarchyController', () => {
  let controller: PartsHierarchyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsHierarchyController],
      providers: [PartsHierarchyService],
    }).compile();

    controller = module.get<PartsHierarchyController>(PartsHierarchyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
