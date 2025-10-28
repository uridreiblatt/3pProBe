import { Company } from "src/company/entities/company.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity()
export class UserCompany {
    @PrimaryGeneratedColumn()
      id: number;
      // @ManyToMany(() => User)
      // @JoinTable()
      // users: User[];
      @ManyToOne(() => User, (user) => user.id)
      users: User[];
      @JoinColumn()
      UserId: number;

      @ManyToOne(() => Company, (company) => company.id)
      company: Company;
      @JoinColumn()
      CompanyId: number;
}
