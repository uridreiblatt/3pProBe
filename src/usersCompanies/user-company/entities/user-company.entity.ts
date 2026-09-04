import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { Role } from 'src/usersCompanies/role/entities/role.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
  Unique,
} from 'typeorm';

@Entity()
@Unique('UQ_user_company_membership', ['users', 'company'])
export class UserCompany extends Tablestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @ManyToMany(() => User)
  // @JoinTable()
  // users: User[];
  @ManyToOne(() => User, (user) => user.userCompany)
  users: User;
  @JoinColumn()
  usersId: string;

  @ManyToOne(() => Company, (company) => company.userCompany)
  company: Company;
  @JoinColumn()
  companyId: string;
}
