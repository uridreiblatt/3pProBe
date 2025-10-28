import { Test, TestingModule } from '@nestjs/testing';
import { ShipRushController } from './ship-rush.controller';
import { ShipRushService } from './ship-rush.service';

describe('ShipRushController', () => {
  let controller: ShipRushController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipRushController],
      providers: [ShipRushService],
    }).compile();

    controller = module.get<ShipRushController>(ShipRushController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
