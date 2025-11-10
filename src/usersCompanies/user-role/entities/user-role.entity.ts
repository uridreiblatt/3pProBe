import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';

@Entity()
export class UsersRoles {
  @PrimaryGeneratedColumn()
  id: number;
  // @ManyToMany(() => User)
  // @JoinTable()
  // users: User[];
  @ManyToOne(() => User, (user) => user.id)
  users: User;
  @ManyToOne(() => Role, (role) => role.id)
  role: Role;

  // @ManyToOne(() => Company, (company) => company.id)
  // company: Company;
  // @JoinColumn()
  // CompanyId: number;

  // @OneToMany(() => Company, (company) => company.id)
  // company: Company[];
  // @JoinColumn()
  // CompanyId: number;
  // // @JoinColumn()
  // userRole: UserRole;
}
