import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreatePartCqauntDto {
  @ApiProperty()
  @IsString()
  partName: string;
  @ApiProperty()
  @Type(() => Number) // "1" -> 1
  @IsString()
  companyId: string;
}
