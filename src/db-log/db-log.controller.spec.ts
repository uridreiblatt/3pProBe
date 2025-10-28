import { Test, TestingModule } from '@nestjs/testing';
import { DbLogController } from './db-log.controller';
import { DbLogService } from './db-log.service';

describe('DbLogController', () => {
  let controller: DbLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbLogController],
      providers: [DbLogService],
    }).compile();

    controller = module.get<DbLogController>(DbLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
