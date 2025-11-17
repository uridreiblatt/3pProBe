import { Module } from '@nestjs/common';
import { AllRmaService } from './all-rma.service';
import { AllRmaController } from './all-rma.controller';
import { AllRma } from './entities/all-rma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbLogModule } from 'src/db-log/db-log.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
      TypeOrmModule.forFeature([AllRma]),
      DbLogModule,
      HttpModule,
    
    ],
  controllers: [AllRmaController],
  providers: [AllRmaService],
})
export class AllRmaModule {}
