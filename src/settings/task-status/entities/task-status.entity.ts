import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class TaskStatus extends Tablestamp {
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
    Complete = 3,
    Pending=4,
    Assistant_Pending=5,
    Assistant_Complete=6,
    Review =7,

  }
  
