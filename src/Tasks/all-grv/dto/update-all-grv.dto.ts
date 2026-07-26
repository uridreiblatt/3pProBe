import { CreateAllGrvDto } from './create-all-grv.dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TaskGrvDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNumber()
  Total: number;
}
export class UpdateAllGrvDto extends PartialType(CreateAllGrvDto) {
  @ApiProperty({
    type: [TaskGrvDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskGrvDto)
  taskGrv?: TaskGrvDto[];
}
