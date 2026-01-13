import { Test, TestingModule } from '@nestjs/testing';
import { DeliverySettingController } from './delivery-setting.controller';
import { DeliverySettingService } from './delivery-setting.service';


describe('DeliverySettingController', () => {
  let controller: DeliverySettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliverySettingController],
      providers: [DeliverySettingService],
    }).compile();

    controller = module.get<DeliverySettingController>(DeliverySettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
