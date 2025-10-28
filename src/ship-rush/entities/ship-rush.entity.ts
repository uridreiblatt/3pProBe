import { Company } from 'src/company/entities/company.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
@Entity('ShipRush')
export class ShipRush {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  siteName: string;
  @Column()
  uomweight: string;
  @Column()
  uomLength: string;
  @Column()
  upsAcountNumber: string;
  @Column()
  accountId: string;
  @Column()
  PickupReadyTime: string;
  @Column()
  LatestPickupTime: string;
  @Column()
  FirstName: string;
  @Column()
  Company: string;
  @Column()
  Address1: string;
  @Column()
  Address2: string;
  @Column({ name: 'City' })
  City: string;
  @Column({ name: 'State' })
  State: string;
  @Column({ name: 'Country' })
  Country: string;
  @Column()
  PostalCode: string;
  @Column()
  Phone: string;
  @ManyToOne(() => Company, (company) => company.boxsizes)
  company: Company;  
}
