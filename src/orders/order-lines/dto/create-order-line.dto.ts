import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateOrderLineDto {
  @ApiProperty({ default: '' })
  orderId: string;
  @ApiProperty({ default: '' })
  PARTNAME: string;
  @ApiProperty({ default: '' })
  PARTDES: string;
  @ApiProperty({ default: 0 })
  TBALANCE: number;
  @ApiProperty({ default: '' })
  BARCODE: string;
  @ApiProperty({ default: '' })
  lineRemarks: string;
  @ApiProperty({ default: 0 })
  Fullfilled: number;
  @ApiProperty({ default: 0 })
  prioritykline: number;
  @ApiProperty({ default: '' })
  priorityremarks: string;
  @ApiProperty({ default: 0 })
  FullfilledSuperViser: number;
  @ApiProperty({ default: false })
  approved: boolean;
  @ApiProperty({ default: false })
  picked: boolean;
  @ApiProperty({ default: false })
  pickingError: boolean;
  @ApiProperty({ default: false })
  pickingAid: boolean;
  @ApiProperty({ default: false })
  assemblyAid: boolean;
  @ApiProperty({ default: 0 })
  ORDI: number;
}

export class CreateOrderLineAssemblyAidDto {
  @ApiProperty({ default: false })
  @IsBoolean()
  assemblyAid: boolean;
  @ApiProperty({ default: 1 })
  @IsNumber()
  assemblyQty: number;
  @ApiProperty({ default: '' })
  @IsString()
  companyId: string;
  @ApiProperty({ default: '' })
  @IsString()
  cylinder: string;
  @ApiProperty({ default: '' })
  @IsString()
  taskInfo: string;
}
