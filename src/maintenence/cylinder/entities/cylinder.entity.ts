import { Company } from "src/usersCompanies/company/entities/company.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cylinder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  partName: string;
  @Column()
  description: string;

  @ManyToOne(() => Company, (company) => company.boxsizes)
  company: Company;
}
