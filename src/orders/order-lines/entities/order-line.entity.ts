import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  //JoinColumn,
} from 'typeorm';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { Order } from 'src/orders/order/entities/order.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
  @Column()
  PARTNAME: string;
  @Column()
  PARTDES: string;
  @Column()
  TBALANCE: number;
  @Column()
  Fullfilled: number;
  @Column()
  FullfilledSuperViser: number;
  @Column()
  BARCODE: string;
  @Column({ nullable: true })
  lineRemarks: string;
  @Column()
  approved: boolean;
  @Column()
  picked: boolean;
  @Column()
  pickingError: boolean;
  @Column()
  prioritykline: number;
  @Column()
  priorityremarks: string;
  @Column()
  pickingAid: boolean;
  @Column()
  assemblyAid: boolean;
  @Column()
  ORDI: number;
  // @Column({ nullable: true })
  // linePhotoBase64: string;
  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
  taskStatus: TaskStatus;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
