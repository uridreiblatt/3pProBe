import { ApiProperty } from "@nestjs/swagger";
import { Company } from "src/company/entities/company.entity";

export class CreatePartCqauntDto {
    @ApiProperty()
      partName: string;
      @ApiProperty()
      companyid: number;  
}
