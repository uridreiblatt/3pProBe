import { IsBoolean } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract  class Tablestamp {
  @Column({default: 0, nullable: false,select: false})
  updatedBy: string;
  @CreateDateColumn({ name: 'created_at',select: false })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at',select: false })
  updatedAt: Date;
  @Column({ name: 'is_active' , default: true, nullable: false, select: false})
  @IsBoolean()
  isActive: boolean;
}




