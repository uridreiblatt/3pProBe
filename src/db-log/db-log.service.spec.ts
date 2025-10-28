import { Test, TestingModule } from '@nestjs/testing';
import { DbLogService } from './db-log.service';

describe('DbLogService', () => {
  let service: DbLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbLogService],
    }).compile();

    service = module.get<DbLogService>(DbLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
