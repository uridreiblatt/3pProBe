import { Test, TestingModule } from '@nestjs/testing';
import { EsController } from './es.controller';
import { EsService } from './es.service';

describe('EsController', () => {
  let controller: EsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsController],
      providers: [EsService],
    }).compile();

    controller = module.get<EsController>(EsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
