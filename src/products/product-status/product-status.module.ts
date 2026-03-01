import { Module } from '@nestjs/common';
import { ProductStatusService } from './product-status.service';
import { ProductStatusController } from './product-status.controller';
import { ProductStatus } from './entities/product-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature( [ProductStatus])],
  controllers: [ProductStatusController],
  providers: [ProductStatusService],
})
export class ProductStatusModule {}
