import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UsersRoles } from './user-role.entity';
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

  // @ManyToOne(() => UserRole, (userRole) => userRole.id)
  // userRole: UserRole[];
  // @JoinColumn()
  // userRole: UserRole;
  @Column()
  otp: string;
}
