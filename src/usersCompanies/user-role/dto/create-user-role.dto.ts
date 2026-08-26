import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsDefined()
  userId: string;
  @ApiProperty({ required: true })
  @IsInt()
  @IsDefined()
  roleId: number;
  @ApiProperty()
  @IsString()
  companyId: string;
}
