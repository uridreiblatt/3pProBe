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
import { Company } from 'src/usersCompanies/company/entities/company.entity';

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
  @Column({default: 0})
  QTYtoassemble: number;
  @Column({default: 0})
  QTYassembled: number;
  @Column({default: 0})
  Total: number;
  @Column({nullable: true})
  BIN: string;
  @Column({default: 0})
  QTY: number;
  @Column({nullable: true})
  BIN_1: string;
  @Column({default: 0})
  QTY_1: number;
  @Column({nullable: true})
  BIN_2: string;
  @Column({default: 0})
  QTY_2: number;
  @Column({nullable: true})
  Supplier: string;
  @Column({nullable: true})
  PalletNumber: string;
  @Column({nullable: true})
  PO: string;
  @Column({nullable: true})
  taskInfo: string;
  @Column({nullable: true})
  Location: string;
  @Column({default: 0})
  NoOfBoxes: number;
  @Column({default: 0})
  NoOfItems: number;
  @Column({nullable: true})
  orderName: string;
  @Column({nullable: true})
  Color: string;
  @Column({default: 0})
  bulkQauntity: number;
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @JoinColumn()
  userId: string;
  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
  //@JoinColumn({ name: 'taskStatusId' })
  taskStatus: TaskStatus;
  @JoinColumn()
  taskStatusId: number;
  @Column({nullable: true})
  orderid: string;
  @Column({nullable: true})
  orderlineId: string;
  @Column({default: 0})
  taskPriority: number;
  @Column({nullable: true})
  rmaNumber: string;
  @Column({nullable: true})
  trackingNumber: string;
  @Column({nullable: true})
  pictureOne: string;
  @Column({nullable: true})
  pictureTwo: string;
  @Column({default: 0})
  statusRma: number;
  @Column({nullable: true})
  customerName: string;
  @Column({nullable: true})
  cylinder: string;
  @Column({default: 0})
  backToInventory: number;
  @ManyToOne(() => Company, (company) => company.taskUser, { nullable: false })
    @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
    company: Company;
}
