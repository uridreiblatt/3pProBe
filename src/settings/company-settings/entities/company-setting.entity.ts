import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

@Entity()
export class CompanySetting extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string; // The primary key will be a UUID string

  @Column({ default: "" })
  priorityApiUrl: string;
  @Column({ default: "" })
  priorityApiCompany: string;

  @Column({ default: "" })
  priorityApiUser: string;

  @Column({ default: "" })
  priorityApiPassword: string;
  @Column({ default: "" })
  priorityOrderStatus: string;
  @Column({ default: "", nullable: true })
  priorityOrderLineStatus: string;
  @Column({ default: false, nullable: true })
  addtionalPickingInfo: boolean;

  @Column({ default: false, nullable: true })
  qcRequired: boolean;
  @Column({ default: '', nullable: true })
  shipmentUrl: string;
  @Column({ default: '', nullable: true })
  shipmentUser: string;
  @Column({ default: '', nullable: true })
  shipmentPassword: string;
  @Column({ default: '', nullable: true })
  shipmentCallBack: string;

  @Column({ default: "" })
  priorityPoStatus: string;
  @Column({ default: "" })
  priorityRmaStatus: string;
  @Column({ default: "" })
  priorityProductStatus: string;

  @OneToOne(() => Company, (company) => company.companySetting)
  company: Company;
  @JoinColumn()
  CompanyId: string;
}
