import { Module } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { Boxsize } from './entities/box.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Boxsize])],
  controllers: [BoxesController],
  providers: [BoxesService],
})
export class BoxesModule {}
