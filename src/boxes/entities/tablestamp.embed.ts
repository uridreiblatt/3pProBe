import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract  class Tablestamp {
  @Column()
  userId: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}




