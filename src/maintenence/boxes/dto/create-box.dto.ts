import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateBoxDto {  
  @ApiProperty({})
  @IsString()
  sizeDesc: string;

  @ApiProperty({default:''})
  @IsString()
  companyId: string;   // required if you expect it in the body
}
