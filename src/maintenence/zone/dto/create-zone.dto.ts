import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateZoneDto {
  @ApiProperty()
  @IsString()
  zoneName: string;
  @ApiProperty()
  @IsString()
  color: string;
  @ApiProperty()
  @IsBoolean()
  priority: boolean;
}
