import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class TaskType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
}
