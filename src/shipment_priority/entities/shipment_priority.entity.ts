import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class ShipmentPriority {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  ShipmentCode: string;
  @Column()
  ShippingMethod: string;
  @Column()
  priority: number;
  @Column()
  shipRushCode: string;
  @Column()
  shipRushAcountNumber: string;
}
