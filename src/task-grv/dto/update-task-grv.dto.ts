import { PartialType } from '@nestjs/swagger';
import { CreateTaskGrvDto } from './create-task-grv.dto';

export class UpdateTaskGrvDto extends PartialType(CreateTaskGrvDto) {}
