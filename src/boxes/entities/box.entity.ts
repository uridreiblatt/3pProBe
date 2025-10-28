import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
export class Boxsize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sizeDesc: string;
}
