import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { TaskUser } from 'src/Tasks/task-user/entities/task-user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  //JoinColumn,
} from 'typeorm';

@Entity()
export class TaskRma extends Tablestamp{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  rmaNumber: string;
  @Column()
  trackingNumber: string;
  @Column({default: 0})
  statusRma: number;
  @Column()
  customerName: string;
  @Column()
  PartNumber: string;
  @Column()
  partQount: number;
  @Column({default: false})
  backToInventory: boolean;
  @Column({default: false})
  productStatus: boolean;

  @Column()
  cylinder: string;
  @Column()
  remarks: string;
  @ManyToOne(() => TaskUser, (taskUser) => taskUser.id)
    taskUser: TaskUser;
  
  



}

