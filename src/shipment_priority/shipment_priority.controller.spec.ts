import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentPriorityController } from './shipment_priority.controller';
import { ShipmentPriorityService } from './shipment_priority.service';

describe('ShipmentPriorityController', () => {
  let controller: ShipmentPriorityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentPriorityController],
      providers: [ShipmentPriorityService],
    }).compile();

    controller = module.get<ShipmentPriorityController>(ShipmentPriorityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
