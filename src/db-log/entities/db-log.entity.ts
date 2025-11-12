import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subject: string;
  @Column({ nullable: true, length: 2000 })
  message: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @Column()
  level: string;
  @Column({ nullable: true })
  context: string;
  @Column({ nullable: true, length: 2000 })
  metadata: string;
  @Column()
  companyId: number;
}




