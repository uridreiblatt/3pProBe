import { ApiProperty } from '@nestjs/swagger';

export class CreateEDto {
  @ApiProperty({ default: 123 })
  user: string;
  @ApiProperty({ default: 'task ' + Date.now })
  name: string;
  @ApiProperty({ default: 'New' })
  status: string;
}
