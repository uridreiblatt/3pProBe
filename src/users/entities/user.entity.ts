import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UsersRoles } from './user-role.entity';
import { Company } from 'src/company/entities/company.entity';
import { UserCompany } from 'src/user-company/entities/user-company.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userName: string;
  @Column()
  userSurname: string;
  @Column()
  userUuid: string;
  @Column()
  usermail: string;
  @Column()
  userMobile: string;
  @Column()
  color: string;
  @Column({ select: false })
  userPasswordEnc: string;
  
  @OneToMany(() => UsersRoles, (userRole) => userRole.users)
  usersRoles: UsersRoles[];
  @JoinColumn()
  UserId: number;

  @OneToMany(() => UserCompany, (userCompany) => userCompany.users)
  userCompany: UserCompany[];
  // @JoinColumn()
  // UserCompanyId: number;

  

  // @ManyToOne(() => UserRole, (userRole) => userRole.id)
  // userRole: UserRole[];
  // @JoinColumn()
  // userRole: UserRole;
  @Column()
  otp: string;
}
