import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { TaskStatus } from "src/settings/task-status/entities/task-status.entity";
import { TaskRma } from "src/Tasks/task-rma/entities/task-rma.entity";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  Entity,
  OneToMany,
} from "typeorm";
@Entity()
export class AllRma extends Tablestamp {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ default: "", nullable: true })
  CUSTNAME: string;
  @Column({ default: "", nullable: true })
  CUSTDES: string;
  @Column()
  CURDATE: string;
  @Column({ default: "", nullable: true })
  DOCNO: string;
  @Column({ default: "", nullable: true })
  DETAILS: string;
  @Column({ default: "", nullable: true })
  STATDES: string;
  @Column({ default: "", nullable: true })
  FBCM_RETREASONCODE: string;
  @Column({ default: "", nullable: true })
  FBCM_RETREASONDES: string;
  @Column({ default: "", nullable: true })
  Title: string;
  @Column({ default: "", nullable: true })
  trackingNumber: string;
  @ManyToOne(() => User, (user) => user.id)
  user: User;  
  @Column()
  taskPriority: number;
  @Column({ default: "", nullable: true })
  remarks: string;
  @ManyToOne(() => Company, (company) => company.allRma, { nullable: false })
  @JoinColumn({ name: "companyId" }) // <-- owns the FK column
  company: Company;
  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
  taskStatus: TaskStatus;
   @OneToMany(
      () => TaskRma,
      (taskRma) => taskRma.allRma,
    )
    taskRma: TaskRma[];    
}
