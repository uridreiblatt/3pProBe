import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
  @Column({ nullable: true })
  roleDisplayName: string;
  @Column({ nullable: true })
  color: string;
}


export enum rolesEnum
  {
    
    Picker =1,    
    QC = 2,
    Packer = 3,
    Shipper=4,
    backOffice=5,
    Administrator=6,  
  }

