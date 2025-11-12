import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';

@Entity()
export class UsersRoles extends Tablestamp {
  @PrimaryGeneratedColumn()
  id: string;
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
