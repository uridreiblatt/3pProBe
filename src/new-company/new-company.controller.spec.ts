import { Test, TestingModule } from '@nestjs/testing';
import { NewCompanyController } from './new-company.controller';
import { NewCompanyService } from './new-company.service';

describe('NewCompanyController', () => {
  let controller: NewCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewCompanyController],
      providers: [NewCompanyService],
    }).compile();

    controller = module.get<NewCompanyController>(NewCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
