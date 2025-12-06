import { PriorityProducts } from 'src/products/priorityProducts/entities/priorityProducts.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Zone } from '../../../maintenence/zone/entities/zone.entity';
import { IsDate } from 'class-validator';

@Entity('priorityProductsLocation')
export class PriorityProductsLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  location: string;
  @Column({ nullable: true, type: 'date' })
  @IsDate()
  stockDate: Date | null;
  @Column()
  quantity: number;
  @ManyToOne(
    () => PriorityProducts,
    (product) => product.PriorityProductsLocation,
    { nullable: false },
  )
  priorityProducts: PriorityProducts;
  @ManyToOne(() => Zone, (zone) => zone.PriorityProductsLocation)  
  zone: Zone;
}
