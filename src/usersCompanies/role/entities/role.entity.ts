import { Tablestamp } from 'src/maintenence/boxes/entities/tablestamp.embed';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Role extends Tablestamp{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
  @Column({ nullable: true })
  roleDisplayName: string;
  @Column({ nullable: true })
  color: string;
}



