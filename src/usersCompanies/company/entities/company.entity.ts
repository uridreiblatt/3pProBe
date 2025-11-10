import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { Cylinder } from 'src/maintenence/cylinder/entities/cylinder.entity';
import { PartCqaunt } from 'src/settings/part-cqaunt/entities/part-cqaunt.entity';
import { ShipRush } from 'src/shipments/ship-rush/entities/ship-rush.entity';
import { ShipmentPriority } from 'src/maintenence/shipment_priority/entities/shipment_priority.entity';
import { UserCompany } from 'src/usersCompanies/user-company/entities/user-company.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { Zone } from 'src/maintenence/zone/entities/zone.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number; // The primary key will be a UUID string

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  Ssn: string;

  
  @Column()
  isActive: boolean;
  @OneToMany(() => UserCompany, (userCompany) => userCompany.company)
  userCompany: UserCompany[];
  @JoinColumn()
  CompanyId: number;

  @OneToMany(() => Boxsize, (boxsize) => boxsize)
    boxsizes: Boxsize[]
    @OneToMany(() => ShipmentPriority, (shipmentPriority) => shipmentPriority)
    shipmentPriority: ShipmentPriority[]
    @OneToMany(() => Cylinder, (cylinder) => cylinder)
    cylinder: Cylinder[]
    @OneToMany(() => PartCqaunt, (partCqaunt) => partCqaunt)
    partCqaunt: PartCqaunt[]
    @OneToMany(() => ShipRush, (shipRush) => shipRush)
    shipRush: ShipRush[]
    @OneToMany(() => Zone, (zone) => zone)
    zone: Zone[]
    
    
    
    
}
