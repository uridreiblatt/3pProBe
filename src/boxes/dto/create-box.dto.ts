import { ApiProperty } from "@nestjs/swagger";

export class CreateBoxDto {  
  @ApiProperty({})
  sizeDesc: string;

  @ApiProperty({default:0})
  CompanyId: number;
}
