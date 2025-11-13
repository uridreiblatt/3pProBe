import { Tablestamp } from "src/maintenence/boxes/entities/tablestamp.embed";
import { TaskStatus } from "src/settings/task-status/entities/task-status.entity";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, Entity } from "typeorm";
@Entity()
export class AllRma extends Tablestamp{
    @PrimaryGeneratedColumn('uuid')
      id: string;      
      @Column()
      DataInfo: string;
      @Column()
      Title: string;
      @Column()
      PO: string;    
      @ManyToOne(() => User, (user) => user.id)
      user: User;  
      // @JoinColumn()
      // userId: string;    
      @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
      //@JoinColumn({ name: 'taskStatusId' })
      taskStatus: TaskStatus;
      @Column()
      orderid: string;
      @Column()
      orderlineId: string;
      @Column()
      taskPriority: number;
      @Column()
      rmaNumber: string;
      @Column()
      trackingNumber: string;
      @Column()
      statusRma: number;
      @Column()
      customerName: string;
      @Column()
      cylinder: string;
      @Column()
      backToInventory: number;
      @ManyToOne(() => Company, (company) => company.allRma, { nullable: false })
        @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
        company: Company;
    
}
