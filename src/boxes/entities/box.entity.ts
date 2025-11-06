import { Company } from 'src/company/entities/company.entity';
import { UserCompany } from 'src/user-company/entities/user-company.entity';
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
@Entity()
export class Boxsize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "1-1-1" })
  sizeDesc: string;



  // @ManyToOne(() => Company, (company) => company.boxsizes)
  // company: Company;
    
  @ManyToOne(() => Company, (company) => company.boxsizes, { nullable: false })
  @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
  company: Company;
}
