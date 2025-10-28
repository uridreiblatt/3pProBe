import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityProductsLocation } from './priority-products-location.entity';

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
}
