import { Test, TestingModule } from '@nestjs/testing';
import { PriorityProductsLocationsController } from './priority-products-locations.controller';
import { PriorityProductsLocationsService } from './priority-products-locations.service';

describe('PriorityProductsLocationsController', () => {
  let controller: PriorityProductsLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityProductsLocationsController],
      providers: [PriorityProductsLocationsService],
    }).compile();

    controller = module.get<PriorityProductsLocationsController>(
      PriorityProductsLocationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
