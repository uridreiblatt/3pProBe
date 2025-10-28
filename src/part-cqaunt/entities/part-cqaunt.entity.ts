import { Company } from 'src/company/entities/company.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
@Entity('PartCqaunt')
export class PartCqaunt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partName: string;
  @ManyToOne(() => Company, (company) => company.boxsizes)
  company: Company;  
}
