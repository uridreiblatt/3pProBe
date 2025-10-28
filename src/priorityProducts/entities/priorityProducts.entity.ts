import { PriorityProductsLocation } from 'src/priority-products-locations/entities/priority-products-location.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('priorityProducts')
export class PriorityProducts {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  PARTNAME: string;
  @Column()
  TYPE: string;
  @Column()
  BARCODE: string;
  @Column()
  PART: number;
  @Column()
  PARTDES: string;
  @OneToMany(
    () => PriorityProductsLocation,
    (PriorityProductsLocation) => PriorityProductsLocation.priorityProducts,
  )
  PriorityProductsLocation: PriorityProductsLocation[];
  @JoinColumn()
  priorityProductsId: number;
}
