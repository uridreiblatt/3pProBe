import { ApiProperty } from "@nestjs/swagger";

export class CreateZoneDto {
    @ApiProperty()
      zoneName: string;
      @ApiProperty()
      color: string;
      @ApiProperty()
      priority: number;
      @ApiProperty()
      companyId: number;
      // @ApiProperty()      
      // zoneId: number;      
}
