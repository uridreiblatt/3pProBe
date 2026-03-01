import { Entity } from "typeorm";

import { Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
@Entity('product_status')
export class ProductStatus extends Tablestamp{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  productStatus: string;
  @ManyToOne(() => Company, (company) => company.productStatuses)
  company: Company;
}
