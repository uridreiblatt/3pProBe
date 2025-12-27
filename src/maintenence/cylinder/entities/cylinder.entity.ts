import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cylinder extends Tablestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({default:''})
  partName: string;
  @Column({default:''})
  description: string;

  @ManyToOne(() => Company, (company) => company.boxsizes)
  company: Company;
}
