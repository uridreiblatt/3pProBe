import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsUUID } from 'class-validator';
import { rolesEnum } from 'src/auth/entities/role.enum';

export class CreateUserRoleDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: rolesEnum, enumName: 'rolesEnum' })
  @Type(() => Number)
  @IsEnum(rolesEnum)
  roleId: rolesEnum;
}
