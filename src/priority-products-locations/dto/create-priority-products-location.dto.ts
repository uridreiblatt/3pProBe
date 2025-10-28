import { ApiProperty } from '@nestjs/swagger';
import { Zone } from '../entities/zone.entity';
import { PriorityProducts } from 'src/priorityProducts/entities/priorityProducts.entity';

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
