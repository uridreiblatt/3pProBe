import { Module } from '@nestjs/common';
import { CylinderService } from './cylinder.service';
import { CylinderController } from './cylinder.controller';
import { Cylinder } from './entities/cylinder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cylinder])],
  controllers: [CylinderController],
  providers: [CylinderService],
})
export class CylinderModule {}
