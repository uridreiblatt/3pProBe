import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateTaskInventoryCountDto } from 'src/Tasks/task-inventory-count/dto/create-task-inventory-count.dto';

export class CreateAllInventoryDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  taskTypeId: number;
  @ApiProperty({ default: 'DataInfo' })
  @IsString()
  DataInfo: string;
  @ApiProperty()
  @IsString()
  PartNumber: string;
  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsString()
  productDescription: string;

  @ApiProperty({ default: 0 })
  @IsInt()
  QTYtoassemble: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  QTYassembled: number;

  @ApiProperty()
  @IsString()
  Location: string;
  @ApiProperty()
  @IsString()
  taskInfo: string;

  @ApiProperty()
  @IsString()
  remarks: string;

  @ApiProperty({ default: 'aaa-bbb-ccc' })
  @IsString()
  userId: string;
  @ApiProperty({ default: 1 })
  @IsInt()
  taskStatusId: number;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsInt()
  taskPriority: number;

  @ApiProperty()
  @IsString()
  cylinder: string;
}
