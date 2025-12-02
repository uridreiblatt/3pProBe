import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityProductsLocation } from '../../../products/priority-products-locations/entities/priority-products-location.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';

@Entity('zone')
export class Zone extends Tablestamp{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  zoneName: string;
  @Column({default: ''})
  color: string;
  @Column()
  priority: number;
  @OneToMany(
    () => PriorityProductsLocation,
    (priorityProductsLocation) => priorityProductsLocation.zone,
  )
  PriorityProductsLocation: PriorityProductsLocation[];
  zoneId: number;
  @ManyToOne(() => Company, (company) => company.zone)
      company: Company;
}
