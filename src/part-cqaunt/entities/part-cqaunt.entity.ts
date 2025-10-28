import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity('PartCqaunt')
export class PartCqaunt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partName: string;
}
