import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { comapny } from 'src/auth/dto/create-auth.dto';

@Module({
   imports: [TypeOrmModule.forFeature([Company,])],
  controllers: [CompanyController],
  providers: [   
    CompanyService],
    exports:[CompanyService]
})
export class CompanyModule {}
