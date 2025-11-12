import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { TaskUser } from "src/Tasks/task-user/entities/task-user.entity";

@Entity()
export class TaskGrv extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  DataInfo: string;
  @Column()
  PO: string;
  @Column()
  Location: string;
  @Column()
  PartNumber: string;
  @Column()
  Supplier: string;
  @Column()
  NoOfBoxes: number;
  @Column()
  NoOfItems: number;
  @Column()
  NoOfBoxes_1: number;
  @Column()
  NoOfItems_1: number;
  @Column()
  NoOfBoxes_2: number;
  @Column()
  NoOfItems_2: number;
  @Column()
  NoOfBoxes_3: number;
  @Column()
  NoOfItems_3: number;
  @Column()
  NoOfBoxes_4: number;
  @Column()
  NoOfItems_4: number;
  @Column()
  NoOfBoxes_5: number;
  @Column()
  NoOfItems_5: number;
  @Column()
  bulkQauntity: number;
  @Column()
  Total: number;
  @ManyToOne(() => TaskUser, (taskUser) => taskUser.id)
  taskUser: TaskUser;
}
