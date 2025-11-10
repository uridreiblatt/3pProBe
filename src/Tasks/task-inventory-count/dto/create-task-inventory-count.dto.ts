import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateTaskInventoryCountDto {
  
  @ApiProperty({ default: 'DataInfo' })
  @IsString()
  DataInfo: string;
  @ApiProperty({ default: 'PartNumber' })
  @IsString()
    PartNumber: string;
  
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfBoxes: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfItems: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfBoxes_1: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfItems_1: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfBoxes_2: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfItems_2: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfBoxes_3: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfItems_3: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfBoxes_4: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfItems_4: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfBoxes_5: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    NoOfItems_5: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    bulkQauntity: number;
    @ApiProperty({ default: 0 })
  @IsInt()
    Total: number;
@ApiProperty({ default: '' })
 @IsString()   
    taskUserId: string;
  
}
