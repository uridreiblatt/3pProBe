import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  //JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';
import { OrderLine } from 'src/order-lines/entities/order-line.entity';
import { Role } from 'src/role/entities/role.entity';
import { OrderBoxes } from 'src/order-boxes/entities/order-box.entity';
import { OrderBasket } from 'src/order-basket/entities/order-basket.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  CUSTNAME: string;
  @Column()
  CUSTNO: string;
  @Column()
  ORDNAME: string;
  @Column()
  STCODE: string;
  @Column()
  STDES: string;
  @Column({ nullable: true })
  ADDRESS: string;
  @Column({ nullable: true })
  ADDRESS2: string;
  @Column({ nullable: true })
  ADDRESS3: string;
  @Column({ nullable: true })
  STATE: string;
  @Column({ nullable: true })
  STATECODE: string;
  @Column({ nullable: true })
  STATENAME: string;
  @Column({ nullable: true })
  CURDATE: string;
  @Column({ nullable: true })
  ZIP: string;
  @Column({ nullable: true })
  COUNTRYNAME: string;
  @Column({ nullable: true })
  ordertext: string;
  @Column({ nullable: true })
  orderRemarks: string;
  @Column({ nullable: true })
  orderPhotoBase64: string;
  @Column({ nullable: true })
  orderPhotoBase64_1: string;
  @Column({ nullable: true })
  orderPhotoBase64_2: string;
  @Column({})
  priorityOrder: number;
  @Column({})
  shipmentOrder: number;
  @Column()
  DETAILS: string;
  @Column({})
  ShData: string;
  @Column()
  CUSTDES: string;
  @Column()
  NAME: string;
  @Column()
  PHONENUM: string;
  @Column()
  FAX: string;
  @Column()
  trackingNumber: string;
  @Column()
  shipRushStatus: string;
  @Column()
  shipRushDeliveryId: string;
  @Column()
  DOCUMENT_DOCNO: string;
  @Column()
  DOCUMENT_DOC: string;
  @Column()
  shipRushShipmentId: string;
  @Column()
  accountId: string;
  @Column()
  accountZip: string;
  @Column()
  orderNote: string;
  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @JoinColumn()
  userId: number;
  @Column({ default: false })
  Pallet: boolean;
  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
  //@JoinColumn({ name: 'taskStatusId' })
  taskStatus: TaskStatus;
  @ManyToOne(() => Role, (role) => role.id)
  //@JoinColumn({ name: 'taskStatusId' })
  role: Role;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];
  @JoinColumn()
  orderId: number;

  @OneToMany(() => OrderBoxes, (orderBox) => orderBox.order)
  orderBoxes: OrderBoxes[];
  @OneToMany(() => OrderBasket, (orderBasket) => orderBasket.order)
  orderBasket: OrderBasket[];
  order: any;
}
