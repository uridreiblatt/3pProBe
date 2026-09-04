import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateTaskGrvDto } from './create-task-grv.dto';
import { IsUUID } from 'class-validator';

//export class UpdateTaskGrvDto extends PartialType(CreateTaskGrvDto) {}
export class UpdateTaskGrvDto extends PartialType(
  OmitType(CreateTaskGrvDto, ['allGrvId'] as const),
) {
  @ApiProperty({ required: true, format: 'uuid' })
  @IsUUID()
  allGrvId: string;
}
