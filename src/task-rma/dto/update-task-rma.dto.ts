import { PartialType } from '@nestjs/swagger';
import { CreateTaskRmaDto } from './create-task-rma.dto';

export class UpdateTaskRmaDto extends PartialType(CreateTaskRmaDto) {}
