import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentPriorityService } from './shipment_priority.service';

describe('ShipmentPriorityService', () => {
  let service: ShipmentPriorityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentPriorityService],
    }).compile();

    service = module.get<ShipmentPriorityService>(ShipmentPriorityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
