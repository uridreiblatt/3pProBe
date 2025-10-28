import { Test, TestingModule } from '@nestjs/testing';
import { GetOrderInfoController } from './get-order-info.controller';
import { GetOrderInfoService } from './get-order-info.service';

describe('GetOrderInfoController', () => {
  let controller: GetOrderInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetOrderInfoController],
      providers: [GetOrderInfoService],
    }).compile();

    controller = module.get<GetOrderInfoController>(GetOrderInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
