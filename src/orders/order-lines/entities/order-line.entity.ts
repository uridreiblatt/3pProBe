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


//      orderLineFromDto.pickingAid = false;
//      orderLineFromDto.assemblyAid = false;

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
  @Column({ nullable: true , default: 0})
  Fullfilled: number;
  @Column(    { nullable: true , default: 0} )
  FullfilledSuperViser: number;
  @Column()
  BARCODE: string;
  @Column({ nullable: true , default: ''})
  lineRemarks: string;
  @Column({ nullable: true , default: false})
  approved: boolean;
  @Column({ nullable: true , default: false})
  picked: boolean;
  @Column({ nullable: true , default: false})
  pickingError: boolean;
  @Column()
  prioritykline: number;
  @Column()
  priorityremarks: string;
  @Column({ nullable: true , default: false})
  pickingAid: boolean;
  @Column({ nullable: true , default: false})
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
