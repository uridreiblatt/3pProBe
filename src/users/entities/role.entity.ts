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
