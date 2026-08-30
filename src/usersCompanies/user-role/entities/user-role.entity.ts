import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';

@Entity()
@Unique(['users', 'role'])
export class UsersRoles extends Tablestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // @ManyToMany(() => User)
  // @JoinTable()
  // users: User[];
  @ManyToOne(() => User, (user) => user.id)
  users: User;
  // @JoinColumn()
  // CompanyId: number;
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
