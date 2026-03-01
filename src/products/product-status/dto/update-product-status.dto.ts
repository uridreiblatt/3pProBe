import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductStatusDto } from './create-product-status.dto';
import { IsBoolean } from 'class-validator';

export class UpdateProductStatusDto extends PartialType(CreateProductStatusDto) {

 @ApiProperty()  
 @IsBoolean()
 isActive: boolean;
}
