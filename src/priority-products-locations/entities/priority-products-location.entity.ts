import { PriorityProducts } from 'src/priorityProducts/entities/priorityProducts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Zone } from '../../zone/entities/zone.entity';
import { IsDate } from 'class-validator';

@Entity('priorityProductsLocation')
export class PriorityProductsLocation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  location: string;
  @Column({ nullable: true, type: 'date' })
  @IsDate()
  stockDate: Date | null;
  @Column()
  quantity: number;
  @ManyToOne(
    () => PriorityProducts,
    (priorityProducts) => priorityProducts.PriorityProductsLocation,
  )
  @JoinColumn({ name: 'priorityProductsId' })
  priorityProducts: PriorityProducts;

  @ManyToOne(() => Zone, (zone) => zone.PriorityProductsLocation)
  @JoinColumn({ name: 'zoneId' })
  zone: Zone;
}
