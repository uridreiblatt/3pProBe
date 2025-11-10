import { Order } from 'src/orders/order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  //OneToMany,
  //JoinColumn,
} from 'typeorm';
@Entity()
export class OrderBasket {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  basketId: string;
  @Column()
  basketRemarks: string;
  @ManyToOne(() => Order, (order) => order)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
