import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTaskStatusDto {
  @ApiProperty()
  @IsString()
  status: string;
  @ApiProperty()
  @IsString()
  color: string;
}
