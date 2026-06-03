import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAiDto {
  @ApiProperty({ default: 'Analyze' })
  @IsString()
  question: string;
  @ApiProperty({ default: 'aaa-aaa-aaa' })
  @IsString()
  companyId: string;
}
