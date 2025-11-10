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

export enum TaskStatusEnum
  {
    
    New =1,    
    In_Progress = 2,
    Complete = 5,
    Pending=6,
    Assistant_Pending=1000,
    Assistant_Complete=1001,
    Review =1002,

  }
