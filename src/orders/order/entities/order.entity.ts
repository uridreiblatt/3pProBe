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
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { OrderLine } from 'src/orders/order-lines/entities/order-line.entity';
import { Role } from 'src/usersCompanies/role/entities/role.entity';
import { OrderBoxes } from 'src/orders/order-boxes/entities/order-box.entity';
import { OrderBasket } from 'src/orders/order-basket/entities/order-basket.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

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
  @Column({})
  priorityOrder: number;
  @Column({})
  shipmentOrder: boolean;
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
  @Column({ nullable: true, default: '' })
  FAX: string;
  @Column({ nullable: true, default: '' })
  trackingNumber: string;
  @Column()
  shipRushStatus: string;
  @Column({ nullable: true, default: '' })
  shipRushDeliveryId: string;
  @Column({ nullable: true, default: '' })
  DOCUMENT_DOCNO: string;
  @Column({ nullable: true, default: '' })
  DOCUMENT_DOC: string;
  @Column({ nullable: true, default: '' })
  shipRushShipmentId: string;
  @Column({ nullable: true, default: '' })
  accountId: string;
  @Column({ nullable: true, default: '' })
  accountZip: string;
  @Column({ nullable: true, default: '', length: 2000 })
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
  @ManyToOne(() => Company, (company) => company.id)
  //@JoinColumn({ name: 'taskStatusId' })
  company: Company;
  @Column({ nullable: true, default: '', length: 2000 })
  CustomerPO: string;
}
