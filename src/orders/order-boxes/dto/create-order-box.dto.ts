import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderBoxItemDto } from 'src/orders/order-box-items/dto/create-order-box-item.dto';

export class CreateOrderBoxDto {
  @ApiProperty({ default: 1 })
  @IsNumber()
  boxweight: number;
  //@IsNumber()
  // @ApiProperty({ default: 1 })
  // @IsNumber()
  // boxNo: number;
  @ApiProperty({ default: '' })
  @IsString()
  boxId: string;
  @ApiProperty({ default: '' })
  @IsString()
  orderId: string;
  @ApiProperty({ default: '' })
  @IsString()
  lineRemarks: string;
  @ApiProperty({ type: [CreateOrderBoxItemDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderBoxItemDto)
  orderBoxLines: CreateOrderBoxItemDto[];
}
