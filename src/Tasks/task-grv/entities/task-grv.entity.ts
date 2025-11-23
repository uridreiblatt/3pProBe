import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { TaskUser } from "src/Tasks/task-user/entities/task-user.entity";

@Entity()
export class TaskGrv extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  DataInfo: string;
  // @Column()
  // PO: string;
  // @Column()
  // Location: string;
  // @Column()
  // Supplier: string;
  @Column()
  PartNumber: string;
  
  @Column({default: 0})
  NoOfBoxes: number;
  @Column({default: 0})
  NoOfItems: number;
  @Column({default: 0})
  NoOfBoxes_1: number;
  @Column({default: 0})
  NoOfItems_1: number;
  @Column({default: 0})
  NoOfBoxes_2: number;
  @Column({default: 0})
  NoOfItems_2: number;
  @Column({default: 0})
  NoOfBoxes_3: number;
  @Column({default: 0})
  NoOfItems_3: number;
  @Column({default: 0})
  NoOfBoxes_4: number;
  @Column({default: 0})
  NoOfItems_4: number;
  @Column({default: 0})
  NoOfBoxes_5: number;
  @Column({default: 0})
  NoOfItems_5: number;
  @Column({default: 0})
  bulkQauntity: number;
  @Column({default: 0})
  Total: number;
  @ManyToOne(() => TaskUser, (taskUser) => taskUser.id)
  taskUser: TaskUser;
}
