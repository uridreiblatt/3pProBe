import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { Role } from "src/usersCompanies/role/entities/role.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity()
export class UserCompany extends Tablestamp {
    @PrimaryGeneratedColumn('uuid')
      id: string;
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
      CompanyId: string;
}
