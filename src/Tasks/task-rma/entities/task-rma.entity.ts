import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { AllRma } from "src/Tasks/all-rma/entities/all-rma.entity";
import { TaskUser } from "src/Tasks/task-user/entities/task-user.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  //JoinColumn,
} from "typeorm";

@Entity()
export class TaskRma extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  PartNumber: string;
  @Column()
  partQount: number;
  @Column({ default: false })
  backToInventory: boolean;
  @Column({ default: false })
  productStatus: boolean;
  @Column({ default: '' })
  productName:string;
  @Column({ default: '' })
  productDescription:string;

  

  @Column({ default: '', nullable: true })
  cylinder: string;
  @Column({ default: '', nullable: true })
  remarks: string;
  @ManyToOne(() => AllRma, (allRma) => allRma.id)
  allRma: AllRma;

}
