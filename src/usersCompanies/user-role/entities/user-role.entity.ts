import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';

@Entity()
@Unique('UQ_user_role_assignment', ['users', 'role'])
export class UsersRoles extends Tablestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.usersRoles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usersId' })
  users: User;

  @ManyToOne(() => Role, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
