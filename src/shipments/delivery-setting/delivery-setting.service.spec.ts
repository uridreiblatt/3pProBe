import { Test, TestingModule } from '@nestjs/testing';
import { ShipRushService } from './delivery-setting.service';

describe('ShipRushService', () => {
  let service: ShipRushService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipRushService],
    }).compile();

    service = module.get<ShipRushService>(ShipRushService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
