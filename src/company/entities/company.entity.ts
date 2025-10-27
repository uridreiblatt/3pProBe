import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
