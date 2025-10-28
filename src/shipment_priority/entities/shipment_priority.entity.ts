import { Company } from "src/company/entities/company.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
@Entity()
export class ShipmentPriority {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  ShipmentCode: string;
  @Column()
  ShippingMethod: string;
  @Column()
  priority: number;
  @Column()
  shipRushCode: string;
  @Column()
  shipRushAcountNumber: string;
  @ManyToOne(() => Company, (company) => company.boxsizes)
  company: Company;
}
