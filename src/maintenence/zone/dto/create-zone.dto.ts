import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateZoneDto {
  @ApiProperty()
  @IsString()
  zoneName: string;
  @ApiProperty()
  @IsString()
  color: string;
  @ApiProperty()
  @Type(() => Number) // "1" -> 1
  @IsInt()
  priority: number;
  @ApiProperty()
  @Type(() => Number) // "1" -> 1
  @IsString()
  companyId: string;
}
