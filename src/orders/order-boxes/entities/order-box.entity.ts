import { float } from '@elastic/elasticsearch/lib/api/types';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
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
export class OrderBoxes {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  lineRemarks: string;
  @Column('float', { precision: 8, scale: 2 })
  boxweight: float;
  @Column({ nullable: true })
  boxNo: number;

  @ManyToOne(() => Boxsize, (boxSize) => boxSize.id)
  @JoinColumn({ name: 'boxSizeId' })
  boxSize: Boxsize;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  // @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  // orderLines: OrderLine[];
  // @JoinColumn()
  // orderId: number;
}
