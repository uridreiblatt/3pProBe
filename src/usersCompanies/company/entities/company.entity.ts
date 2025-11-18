import { Boxsize } from "src/maintenence/boxes/entities/box.entity";
import { Cylinder } from "src/maintenence/cylinder/entities/cylinder.entity";
import { PartCqaunt } from "src/settings/part-cqaunt/entities/part-cqaunt.entity";
import { ShipRush } from "src/shipments/ship-rush/entities/ship-rush.entity";
import { ShipmentPriority } from "src/maintenence/shipment_priority/entities/shipment_priority.entity";
import { UserCompany } from "src/usersCompanies/user-company/entities/user-company.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Zone } from "src/maintenence/zone/entities/zone.entity";
import { TaskUser } from "src/Tasks/task-user/entities/task-user.entity";
import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { AllRma } from "src/Tasks/all-rma/entities/all-rma.entity";
import { CompanySetting } from "src/settings/company-settings/entities/company-setting.entity";

@Entity()
export class Company extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string; // The primary key will be a UUID string

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column()
  Ssn: string;

  @OneToOne(() => CompanySetting, (companySetting) => companySetting.company, {
    cascade: true,   // optional: auto-save profile when saving user
    eager: true,     // optional: always load profile with user
  })
  @JoinColumn()      // FK column lives on User table
  companySetting: CompanySetting;

  @OneToMany(() => UserCompany, (userCompany) => userCompany.company)
  userCompany: UserCompany[];
  @JoinColumn()
  CompanyId: number;

  @OneToMany(() => Boxsize, (boxsize) => boxsize)
  boxsizes: Boxsize[];
  @OneToMany(() => ShipmentPriority, (shipmentPriority) => shipmentPriority)
  shipmentPriority: ShipmentPriority[];
  @OneToMany(() => Cylinder, (cylinder) => cylinder)
  cylinder: Cylinder[];
  @OneToMany(() => PartCqaunt, (partCqaunt) => partCqaunt)
  partCqaunt: PartCqaunt[];
  @OneToMany(() => ShipRush, (shipRush) => shipRush)
  shipRush: ShipRush[];
  @OneToMany(() => Zone, (zone) => zone)
  zone: Zone[];
  @OneToMany(() => TaskUser, (taskUser) => taskUser)
  taskUser: TaskUser[];
  @OneToMany(() => AllRma, (allRma) => allRma)
  allRma: AllRma[];
}
