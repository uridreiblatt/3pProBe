import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('priorityProductsHierarchy')
export class PriorityProductsHierarchy {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  PART: number;
  @Column()
  SON: number;
  // @ManyToOne(
  //   () => PriorityProducts,
  //   (priorityProducts) => priorityProducts.priorityProductsHierarchy,
  // )
  // @JoinColumn({ name: 'priorityProductsId' })
  // priorityProducts: PriorityProducts;
}
