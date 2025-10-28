import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cylinder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  partName: string;
  @Column()
  description: string;
}
