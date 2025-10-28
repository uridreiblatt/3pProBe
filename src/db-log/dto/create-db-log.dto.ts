import { ApiProperty } from '@nestjs/swagger';

export class CreateDbLogDto {
  @ApiProperty()
  subject: string;
  @ApiProperty()
  message: string;
}
