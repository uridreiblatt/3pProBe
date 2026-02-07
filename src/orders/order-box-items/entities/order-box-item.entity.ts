import { float } from '@elastic/elasticsearch/lib/api/types';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { OrderBoxes } from 'src/orders/order-boxes/entities/order-box.entity';
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
@Entity({ name: "order_boxes_items" }) // <-- set your real table name
export class OrderBoxesItems extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: true })
  partNumber: string;
  @Column({ nullable: true })
  productName: string;
  @Column({ nullable: true })
  productDescription: string;
  @Column({ nullable: true, default: 0 })
  itemsCount: number;
  @ManyToOne(() => OrderBoxes, (orderBoxes) => orderBoxes.id)
  @JoinColumn({ name: "orderBoxesId" })
  orderBoxes: OrderBoxes;
  @Column({ nullable: true })
  orderId: string; 
@Column({ default: 0 })
  orderLineItemsCount:number;
}
