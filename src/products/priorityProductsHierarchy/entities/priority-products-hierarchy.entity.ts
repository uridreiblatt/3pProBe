import { PriorityProducts } from 'src/products/priorityProducts/entities/priorityProducts.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('priorityProductsHierarchy')
export class PriorityProductsHierarchy {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  PART: number;
  @Column()
  SON: number;
  @ManyToOne(
    () => PriorityProducts,
    (priorityProducts) => priorityProducts.PriorityProductsHierarchy,
    { nullable: false },
  )
  @JoinColumn({ name: 'PART', referencedColumnName: 'PART' })
  priorityProducts: PriorityProducts;
}
