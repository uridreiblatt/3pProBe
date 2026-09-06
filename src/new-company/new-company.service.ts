import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNewCompanyDto } from './dto/create-new-company.dto';
import { UpdateNewCompanyDto } from './dto/update-new-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { UserCompany } from 'src/usersCompanies/user-company/entities/user-company.entity';
import { CompanySetting } from 'src/settings/company-settings/entities/company-setting.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { UsersRoles } from 'src/usersCompanies/user-role/entities/user-role.entity';
import { Role } from 'src/usersCompanies/role/entities/role.entity';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { company } from 'src/auth/dto/create-auth.dto';
import { randomUUID } from 'crypto';
import { Cylinder } from 'src/maintenence/cylinder/entities/cylinder.entity';
import { DeliverySetting } from 'src/shipments/delivery-setting/entities/delivery-setting.entity';

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
    @InjectRepository(UsersRoles)
    private userRoleRepository: Repository<UsersRoles>,
    @InjectRepository(Boxsize)
    private boxSizeRepository: Repository<Boxsize>,
    @InjectRepository(Cylinder)
    private cylinderRepository: Repository<Cylinder>,
    @InjectRepository(DeliverySetting)
    private deliverySettingRepository: Repository<DeliverySetting>,
  ) {}
  async create(createNewCompanyDto: CreateNewCompanyDto) {
    if (createNewCompanyDto.AdminPassword !== 'DannyCompulockyAdmin')
      throw UnauthorizedException;
    const companyExits = await this.companyRepository.findOne({
      where: {
        companySetting: {
          priorityApiUrl: createNewCompanyDto.priorityApiUrl,
          priorityApiCompany: createNewCompanyDto.priorityApiCompany,
        },
      },
    });
    if (companyExits)
      throw new BadRequestException('Company already exists ', {
        cause: new Error(),
        description: 'Company already exists',
      });

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
    const resCompanySetting =
      await this.companySettingRepository.save(cmpSetting);

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
    usr.userName = createNewCompanyDto.priorityApiCompany + 'Admin';
    usr.userPasswordEnc = createNewCompanyDto.priorityApiCompany + '#Zbq';
    usr.userSurname = createNewCompanyDto.priorityApiCompany + 'Admin';
    usr.userUuid = randomUUID();
    usr.userMail = createNewCompanyDto.priorityApiCompany + 'Admin@mail.com';
    usr.userMobile = '+001-';
    usr.selectedCompany = resCompany.id;
    const resUser = await this.userRepository.save(usr);

    ////////////////// UserCompany ////////////////////////////////////
    const usrCompany = new UserCompany();
    usrCompany.users = { id: resUser.id } as User;
    usrCompany.company = { id: resCompany.id } as Company;
    const resUserCompany = await this.userCompanyRepository.save(usrCompany);
    ////////////////// UserRole ////////////////////////////////////
    const usrRole = new UsersRoles();
    usrRole.users = new User();
    usrRole.users.id = resUser.id;
    usrRole.role = new Role();
    usrRole.role.id = 7;

    const resUserRole = await this.userRoleRepository.save(usrRole);
    ////////////////// BoxSize ////////////////////////////////////
    let boxSize = new Boxsize();
    boxSize.company = new Company();
    boxSize.company.id = resCompany.id;
    boxSize.sizeDesc = 'Pallet';
    await this.boxSizeRepository.save(boxSize);
    boxSize = new Boxsize();
    boxSize.company = new Company();
    boxSize.company.id = resCompany.id;
    boxSize.sizeDesc = 'Custom';
    await this.boxSizeRepository.save(boxSize);
    let cylinder = new Cylinder();
    cylinder.company = new Company();
    cylinder.company.id = resCompany.id;
    cylinder.partName = 'Not-Needed';
    cylinder.description = 'Not-Needed';
    await this.cylinderRepository.save(cylinder);
    let deliverySetting = new DeliverySetting();
    deliverySetting.company = new Company();
    deliverySetting.company.id = resCompany.id;
    deliverySetting.Address1 = 'Standard';
    deliverySetting.City = 'Standard';
    deliverySetting.Company = 'Standard';
    deliverySetting.Country = 'Standard';
    deliverySetting.uomLength = 'KGS';
    deliverySetting.uomLength = 'CM';
    deliverySetting.Phone = 'Standard';
    deliverySetting.PostalCode = 'Standard';
    deliverySetting.State = 'Standard';
    deliverySetting.PickupReadyTime = 'Standard';
    deliverySetting.LatestPickupTime = 'Standard';
    deliverySetting.FirstName = 'Standard';
    deliverySetting.upsAcountNumber = 'Standard';
    deliverySetting.siteName = 'Standard';
    await this.deliverySettingRepository.save(deliverySetting);

    return {
      AdminUser: createNewCompanyDto.priorityApiCompany + 'Admin@mail.com',
      AdminPassword: createNewCompanyDto.priorityApiCompany + '#Zbq',
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

  async remove(id: string, AdminPassword: string) {
    if (AdminPassword !== 'DannyCompulockyAdmin') throw UnauthorizedException;
    await this.boxSizeRepository.delete({
      company: { id: id },
    });
    const users = await this.userCompanyRepository.find({
      where: { company: { id: id } },
    });
    users.forEach(async (u) => {
      await this.userRoleRepository.delete({
        users: { id: u.id },
      });
    });

    await this.userCompanyRepository.delete({
      company: { id: id },
    });

    const resUser = await this.userRepository.delete({
      selectedCompany: id,
    });

    const resComp = await this.companyRepository.findOne({
      where: { id: id },
    });

    const res = await this.companyRepository.delete(id);

    if (resComp && resComp.companySetting) {
      await this.companySettingRepository.delete(resComp.companySetting.id);
    }

    return res;
  }
}
