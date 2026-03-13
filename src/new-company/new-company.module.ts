import { Module } from '@nestjs/common';
import { NewCompanyService } from './new-company.service';
import { NewCompanyController } from './new-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { CompanySetting } from 'src/settings/company-settings/entities/company-setting.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { UsersRoles } from 'src/usersCompanies/user-role/entities/user-role.entity';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { UserCompany } from 'src/usersCompanies/user-company/entities/user-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company,CompanySetting,User,UserCompany ,UsersRoles,Boxsize])],
  controllers: [NewCompanyController],
  providers: [NewCompanyService],
})
export class NewCompanyModule {}
