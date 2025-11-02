import { ApiProperty } from '@nestjs/swagger';

export class CreateDbLogDto {
  @ApiProperty()
  subject: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
    level: string;
    @ApiProperty()
    context: string;
    @ApiProperty()
    metadata: string;
    @ApiProperty()
    companyId: number;
}
