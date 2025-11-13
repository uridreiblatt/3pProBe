import { Module } from '@nestjs/common';
import { AllRmaService } from './all-rma.service';
import { AllRmaController } from './all-rma.controller';
import { AllRma } from './entities/all-rma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([AllRma]),
    
    ],
  controllers: [AllRmaController],
  providers: [AllRmaService],
})
export class AllRmaModule {}
