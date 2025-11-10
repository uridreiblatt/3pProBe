import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class TaskType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
}


export enum TaskTypesEnum
  {
    
    Assembly =1,    
    Inventory_count = 2,
    Good_received = 3,
    Warehouse_changes=4,
    Assembly_Order=5,
    Inventory_count_Poland=6,
    Inventory_count_US =7,
    Picking = 8,
    RMA = 1001,
  }