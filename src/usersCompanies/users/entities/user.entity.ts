import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserCompany } from 'src/usersCompanies/user-company/entities/user-company.entity';
import { UsersRoles } from 'src/usersCompanies/user-role/entities/user-role.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
@Entity('user')
export class User extends Tablestamp{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({default: ''})
  userName: string;
  @Column()
  userSurname: string;
  @Column()
  userUuid: string;
  @Column()
  userMail: string;
  @Column()
  userMobile: string;
  @Column({default: 'grey'})
  color: string;
  @Column({ select: false })
  userPasswordEnc: string;
  
  @OneToMany(() => UsersRoles, (userRole) => userRole.users)
  usersRoles: UsersRoles[];
  @JoinColumn()
  UserId: string;

  @OneToMany(() => UserCompany, (userCompany) => userCompany.users)
  userCompany: UserCompany[];
  // @JoinColumn()
  // UserCompanyId: number;

  

  // @ManyToOne(() => UserRole, (userRole) => userRole.id)
  // userRole: UserRole[];
  // @JoinColumn()
  // userRole: UserRole;
  @Column({default: '0'})
  otp: string;
}
