import { Company } from "src/usersCompanies/company/entities/company.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
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
  @ManyToOne(() => Company, (company) => company.shipmentPriority)
  @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
  company: Company;
}
