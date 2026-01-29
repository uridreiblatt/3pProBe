import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { TaskUser } from "src/Tasks/task-user/entities/task-user.entity";

@Entity()
export class TaskGrv extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ default: "" })
  DataInfo: string;
  //
  // PO: string;
  // @Column()
  // Location: string;
  // @Column()
  // Supplier: string;
  @Column({ default: "" })
  PartNumber: string;
  @Column()
  productName: string;
  @Column()
  productDescription: string;

  @Column({ default: 0 })
  NoOfBoxes_0: number;
  @Column({ default: 0 })
  NoOfItems_0: number;
  @Column({ default: 0 })
  NoOfBoxes_1: number;
  @Column({ default: 0 })
  NoOfItems_1: number;
  @Column({ default: 0 })
  NoOfBoxes_2: number;
  @Column({ default: 0 })
  NoOfItems_2: number;
  @Column({ default: 0 })
  NoOfBoxes_3: number;
  @Column({ default: 0 })
  NoOfItems_3: number;
  @Column({ default: 0 })
  NoOfBoxes_4: number;
  @Column({ default: 0 })
  NoOfItems_4: number;
  @Column({ default: 0 })
  NoOfBoxes_5: number;
  @Column({ default: 0 })
  NoOfItems_5: number;
  @Column({ default: 0 })
  bulkQauntity: number;
  @Column({ default: 0 })
  Total: number;
  @Column({ default: 0 })
  quantityRequired: number;
  @ManyToOne(() => TaskUser, (taskUser) => taskUser.id)
  taskUser: TaskUser;
}
