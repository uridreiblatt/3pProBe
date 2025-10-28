import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: string;
  @Column()
  color: string;
}
