import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityProductsLocation } from '../../priority-products-locations/entities/priority-products-location.entity';
import { Company } from 'src/company/entities/company.entity';

@Entity('zone')
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  zoneName: string;
  @Column()
  color: string;
  @Column()
  priority: number;
  @OneToMany(
    () => PriorityProductsLocation,
    (priorityProductsLocation) => priorityProductsLocation.zone,
  )
  PriorityProductsLocation: PriorityProductsLocation[];
  zoneId: number;
  @ManyToOne(() => Company, (company) => company.boxsizes)
      company: Company;
}
