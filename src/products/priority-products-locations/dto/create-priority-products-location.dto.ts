import { ApiProperty } from '@nestjs/swagger';
import { Zone } from '../../../maintenence/zone/entities/zone.entity';
import { PriorityProducts } from 'src/products/priorityProducts/entities/priorityProducts.entity';
import { IsInt, isInt, IsString } from 'class-validator';

export class CreatePriorityProductsLocationDto {
  @ApiProperty()
  @IsString()
  location: string;
  @ApiProperty()
  @IsString()
  zoneId: string;
  @ApiProperty()
  @IsString()
  productId: string;
  // @ApiProperty()
  // stockDate: Date;
  @ApiProperty()
  @IsInt()
  quantity: number;
  @ApiProperty()
  @IsString()
  companyId: string;
}
