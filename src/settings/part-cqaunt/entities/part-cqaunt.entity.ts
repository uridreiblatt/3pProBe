import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
@Entity('PartCqaunt')
export class PartCqaunt extends Tablestamp{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  partName: string;
  @ManyToOne(() => Company, (company) => company.partCqaunt)
  @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
  company: Company;  
}
