import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DbLog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subject: string;
  @Column()
  message: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
