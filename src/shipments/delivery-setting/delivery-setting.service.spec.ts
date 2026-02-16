import { Test, TestingModule } from '@nestjs/testing';
import { DeliverySettingService } from './delivery-setting.service';

describe('ShipRushService', () => {
  let service: DeliverySettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliverySettingService],
    }).compile();

    service = module.get<DeliverySettingService>(DeliverySettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
