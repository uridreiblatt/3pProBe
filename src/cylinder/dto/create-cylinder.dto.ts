import { ApiProperty } from "@nestjs/swagger";

export class CreateCylinderDto {
    @ApiProperty()
      partName: string;
      @ApiProperty()
      description: string;
      @ApiProperty()
      companyId: number;
}
