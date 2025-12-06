import { PriorityProductsLocation } from "src/products/priority-products-locations/entities/priority-products-location.entity";
import { PriorityProductsHierarchy } from "src/products/priorityProductsHierarchy/entities/priority-products-hierarchy.entity";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("priorityProducts")
export class PriorityProducts {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  PARTNAME: string;
  @Column()
  TYPE: string;
  @Column()
  BARCODE: string;
  @Column({ unique: true })
  PART: number;
  @Column()
  PARTDES: string;
 
  @ManyToOne(() => Company, (company) => company.priorityProducts, {
    nullable: false,
  })  
  company: Company;


@OneToMany(
    () => PriorityProductsHierarchy,
    (hierarchy) => hierarchy.priorityProducts,
  )
  PriorityProductsHierarchy: PriorityProductsHierarchy[];

  @OneToMany(
    () => PriorityProductsLocation,
    (location) => location.priorityProducts,
  )
  PriorityProductsLocation: PriorityProductsLocation[];
  
 
}
