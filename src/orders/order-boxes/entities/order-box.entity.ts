import { float } from '@elastic/elasticsearch/lib/api/types';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { OrderBoxesItems } from 'src/orders/order-box-items/entities/order-box-item.entity';
import { Order } from 'src/orders/order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  //OneToMany,
  //JoinColumn,
} from 'typeorm';
@Entity()
export class OrderBoxes extends Tablestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  lineRemarks: string;
  @Column('float', { precision: 8, scale: 2, default: 0 })
  boxweight: float;
  @Column({ nullable: true })
  boxNo: number;
  @Column({ nullable: true, default: 0 })
  itemsCount: number;
  @ManyToOne(() => Boxsize, (boxSize) => boxSize.id)
  @JoinColumn({ name: 'boxSizeId' })
  boxSize: Boxsize;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @OneToMany(() => OrderBoxesItems, (orderBoxesItems) => orderBoxesItems.orderBoxes)
  orderBoxesItems: OrderBoxesItems[];
  @JoinColumn()
  orderBoxesItemsId: string;
}
