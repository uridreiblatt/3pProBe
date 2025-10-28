import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class ReportView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  reportName: string;
  @Column({ nullable: true })
  reportTitleName: string;
}
