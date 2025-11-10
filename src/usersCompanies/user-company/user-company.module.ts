import { Module } from '@nestjs/common';
import { UserCompanyService } from './user-company.service';
import { UserCompanyController } from './user-company.controller';
import { UserCompany } from './entities/user-company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserCompany])],
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
})
export class UserCompanyModule {}
