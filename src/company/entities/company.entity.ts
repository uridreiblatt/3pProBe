import { UserCompany } from 'src/user-company/entities/user-company.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number; // The primary key will be a UUID string

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  Ssn: string;

  
  @Column()
  isActive: boolean;
  @OneToMany(() => UserCompany, (userCompany) => userCompany.company)
  userCompany: UserCompany[];
  @JoinColumn()
  CompanyId: number;
}
