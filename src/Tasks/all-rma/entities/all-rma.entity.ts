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
      CUSTNAME: string;      
      @Column()
      CUSTDES: string;      
      @Column()
      CURDATE: string;      
      @Column()
      DOCNO: string;      
      @Column()
      DETAILS: string;      
      @Column()
      STATDES: string;   
      @Column()
      FBCM_RETREASONCODE: string;   
      @Column()
      FBCM_RETREASONDES: string;      
      
      
      // @Column()
      // DataInfo: string;
      // @Column()
      // Title: string;         
      @ManyToOne(() => User, (user) => user.id)
      user: User;  
      @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.id)
      taskStatus: TaskStatus;
      @Column()
      orderid: string;
      @Column()
      orderlineId: string;
      @Column()
      taskPriority: number;
      @Column()
      cylinder: string;
      @Column()
      backToInventory: number;
      @ManyToOne(() => Company, (company) => company.allRma, { nullable: false })
        @JoinColumn({ name: 'companyId' }) // <-- owns the FK column
        company: Company;
    
}
