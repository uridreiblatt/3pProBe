import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { User } from './user.entity';
@Entity()
export class UsersRoles {
  @PrimaryGeneratedColumn()
  id: number;
  // @ManyToMany(() => User)
  // @JoinTable()
  // users: User[];
  @ManyToOne(() => User, (user) => user.id)
  users: User[];
  @ManyToOne(() => Role, (role) => role.id)
  role: Role;
  // // @JoinColumn()
  // userRole: UserRole;
}
