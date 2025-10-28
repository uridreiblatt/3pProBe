import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSmDto {
  @ApiProperty()
  @IsNotEmpty()
  userMessage: string;

  @ApiProperty()
  @IsNotEmpty()
  userMobile: string;
}
