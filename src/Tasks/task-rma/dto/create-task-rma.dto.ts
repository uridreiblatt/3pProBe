import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateTaskRmaDto {
  @ApiProperty()
  @IsString()
  PartNumber: string;
  @ApiProperty()
  @IsString()
  productName: string;
  @ApiProperty()
  @IsString()
  productDescription: string;
  @ApiProperty()
  @IsInt()
  partQount: number;
  @ApiProperty()
  @IsBoolean()
  backToInventory: boolean;
  @ApiProperty()
  @IsBoolean()
  productStatus: boolean;
  @ApiProperty()
  @IsString()
  cylinder: string;
  @ApiProperty()
  @IsString()
  remarks: string;
  @ApiProperty()
  @IsString()
  rmaId: string;
}
