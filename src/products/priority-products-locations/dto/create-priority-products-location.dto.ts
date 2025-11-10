import { ApiProperty } from '@nestjs/swagger';
import { Zone } from '../../../maintenence/zone/entities/zone.entity';
import { PriorityProducts } from 'src/products/priorityProducts/entities/priorityProducts.entity';

export class CreatePriorityProductsLocationDto {
  @ApiProperty()
  location: string;
  @ApiProperty()
  zone: Zone;
  @ApiProperty()
  priorityProducts: PriorityProducts;
  @ApiProperty()
  stockDate: Date;
  @ApiProperty()
  quantity: number;
}
