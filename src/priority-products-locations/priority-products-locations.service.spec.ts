import { Test, TestingModule } from '@nestjs/testing';
import { PriorityProductsLocationsService } from './priority-products-locations.service';

describe('PriorityProductsLocationsService', () => {
  let service: PriorityProductsLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriorityProductsLocationsService],
    }).compile();

    service = module.get<PriorityProductsLocationsService>(PriorityProductsLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
