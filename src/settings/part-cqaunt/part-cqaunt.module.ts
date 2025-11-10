import { Module } from '@nestjs/common';
import { PartCqauntService } from './part-cqaunt.service';
import { PartCqauntController } from './part-cqaunt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartCqaunt } from './entities/part-cqaunt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartCqaunt])],
  controllers: [PartCqauntController],
  providers: [PartCqauntService],
  exports: [PartCqauntService],
})
export class PartCqauntModule {}
