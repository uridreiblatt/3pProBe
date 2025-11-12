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
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { TaskType } from '../../../settings/task-type/entities/task-type.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';

@Entity()
export class TaskUser extends Tablestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => TaskType, (taskType) => taskType.id)
  taskType: TaskType;
  @Column()
  DataInfo: string;
  @Column()
  PartNumber: string;
  @Column()
  QTYtoassemble: number;
  @Column()
  QTYassembled: number;
  @Column()
  Total: number;
  @Column()
  BIN: string;
  @Column()
  QTY: number;
  @Column()
  BIN_1: string;
  @Column()
  QTY_1: number;
  @Column()
  BIN_2: string;
  @Column()
  QTY_2: number;
  @Column()
  Supplier: string;
  @Column()
  PalletNumber: string;
  @Column()
  PO: string;
  @Column()
  taskInfo: string;
  @Column()
  Location: string;
  @Column()
  NoOfBoxes: number;
  @Column()
  NoOfItems: number;
  @Column()
  orderName: string;
  @Column()
  Color: string;
  @Column()
  bulkQauntity: number;
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @JoinColumn()
  userId: number;
  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
  //@JoinColumn({ name: 'taskStatusId' })
  taskStatus: TaskStatus;
  @JoinColumn()
  taskStatusId: number;
  @Column()
  orderid: string;
  @Column()
  orderlineId: string;
  @Column()
  taskPriority: number;
  @Column()
  rmaNumber: string;
  @Column()
  trackingNumber: string;
  @Column()
  pictureOne: string;
  @Column()
  pictureTwo: string;
  @Column()
  statusRma: number;
  @Column()
  customerName: string;
  @Column()
  cylinder: string;
  @Column()
  backToInventory: number;
}
