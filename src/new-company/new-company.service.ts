import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateNewCompanyDto } from "./dto/create-new-company.dto";
import { UpdateNewCompanyDto } from "./dto/update-new-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { UserCompany } from "src/usersCompanies/user-company/entities/user-company.entity";
import { CompanySetting } from "src/settings/company-settings/entities/company-setting.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import { UsersRoles } from "src/usersCompanies/user-role/entities/user-role.entity";
import { Role } from "src/usersCompanies/role/entities/role.entity";
import { Boxsize } from "src/maintenence/boxes/entities/box.entity";
import { comapny } from "src/auth/dto/create-auth.dto";

@Injectable()
export class NewCompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(CompanySetting)
    private companySettingRepository: Repository<CompanySetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserCompany)
    private userCompanyRepository: Repository<UserCompany>,
    @InjectRepository(UserCompany)
    private userRoleRepository: Repository<UsersRoles>,
    @InjectRepository(Boxsize)
    private boxSizeRepository: Repository<Boxsize>
  ) {}
  async create(createNewCompanyDto: CreateNewCompanyDto) {
    if (createNewCompanyDto.AdminPassword !== "CmplAdmin")
      throw UnauthorizedException;
    ////////////////// CompanySetting /////////////////////////////
    const cmpSetting = new CompanySetting();
    cmpSetting.priorityApiCompany = createNewCompanyDto.priorityApiCompany;
    cmpSetting.priorityApiPassword = createNewCompanyDto.priorityApiPassword;
    cmpSetting.priorityApiUrl = createNewCompanyDto.priorityApiUrl;
    cmpSetting.priorityApiUser = createNewCompanyDto.priorityApiUser;
    cmpSetting.priorityOrderStatus = createNewCompanyDto.priorityOrderStatus;
    cmpSetting.priorityOrderLineStatus =
      createNewCompanyDto.priorityOrderLineStatus;
    cmpSetting.priorityPoStatus = createNewCompanyDto.priorityPoStatus;
    cmpSetting.priorityRmaStatus = createNewCompanyDto.priorityRmaStatus;
    cmpSetting.priorityProductStatus =
      createNewCompanyDto.priorityProductStatus;
    cmpSetting.addtionalPickingInfo = createNewCompanyDto.addtionalPickingInfo;
    cmpSetting.qcRequired = createNewCompanyDto.qcRequired;
    cmpSetting.boxItemsCount = createNewCompanyDto.boxItemsCount;
    const resCompanySetting = await this.companySettingRepository.save(
      cmpSetting
    );
    ////////////////// Company ////////////////////////////////////
    const cmp = new Company();
    cmp.name = createNewCompanyDto.priorityApiCompany;
    cmp.description = createNewCompanyDto.priorityApiCompany;
    cmp.Ssn = createNewCompanyDto.priorityApiCompany;
    cmp.companySetting = new CompanySetting();
    cmp.companySetting.id = resCompanySetting.id;
    const resCompany = await this.companyRepository.save(cmp);
    ////////////////// User ////////////////////////////////////
    const usr = new User();
    usr.userName = createNewCompanyDto.priorityApiCompany + "Admin";
    usr.userPasswordEnc = createNewCompanyDto.priorityApiCompany + "#Zbq";
    usr.selectedCompany = cmp.id;
    const resUser = await this.userRepository.save(usr);
    ////////////////// UserCompany ////////////////////////////////////
    const usrCompany = new UserCompany();
    usrCompany.users = new User();
    usrCompany.users.id = usr.id;
    usrCompany.company = new Company();
    usrCompany.company.id = cmp.id;
    const resUserCompany = await this.userCompanyRepository.save(usr);
    ////////////////// UserRole ////////////////////////////////////
    const usrRole = new UsersRoles();
    usrRole.users = new User();
    usrRole.users.id = usr.id;
    usrRole.role = new Role();
    usrRole.role.id = 7;
    const resUserRole = await this.userRoleRepository.save(usr);
    ////////////////// BoxSize ////////////////////////////////////
    let boxSize = new Boxsize();
    boxSize.company = new Company();
    boxSize.company.id = cmp.id;
    boxSize.sizeDesc = "Pallet";
    await this.boxSizeRepository.save(usr);
    boxSize.company = new Company();
    boxSize.company.id = cmp.id;
    boxSize.sizeDesc = "Custom";
    await this.boxSizeRepository.save(usr);

    return {
      AdminUser: createNewCompanyDto.priorityApiCompany + "Admin",
      AdminPassword: createNewCompanyDto.priorityApiCompany + "#Zbq",
    };

    //companyBox
  }

  // findAll() {
  //   return `This action returns all newCompany`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} newCompany`;
  // }

  // update(id: number, updateNewCompanyDto: UpdateNewCompanyDto) {
  //   return `This action updates a #${id} newCompany`;
  // }

  async remove(id: string) {
    await this.boxSizeRepository.delete({
      company: { id: id },
    });
    const users = await this.userCompanyRepository.find({
      where: {company:{id:id}}
    })
    users.forEach(async (u)=>{
      await this.userRoleRepository.delete({
      users:{ id: u.id },
    });

    })

    await this.userCompanyRepository.delete({
      company: { id: id },
    });
    await this.companySettingRepository.delete({
      company: { id: id },
    });

    return await this.companyRepository.delete(id);
  }
}
