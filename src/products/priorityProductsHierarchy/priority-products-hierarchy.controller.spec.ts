import { Test, TestingModule } from '@nestjs/testing';
import { PriorityProductsHierarchyController } from './priority-products-hierarchy.controller';
import {  PriorityProductsHierarchyService } from './priority-products-hierarchy.service';

describe('PriorityProductsHierarchyController', () => {
  let controller: PriorityProductsHierarchyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityProductsHierarchyController],
      providers: [PriorityProductsHierarchyService],
    }).compile();

    controller = module.get<PriorityProductsHierarchyController>(PriorityProductsHierarchyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
