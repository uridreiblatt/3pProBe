import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
@Entity('PartCqaunt')
export class PartCqaunt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partName: string;
  @ManyToOne(() => Company, (company) => company.partCqaunt)
  @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
  company: Company;  
}
