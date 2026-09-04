import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateCylinderDto {
  @ApiProperty()
  @IsString()
  partName: string;
  @ApiProperty()
  @IsString()
  description: string;
}
