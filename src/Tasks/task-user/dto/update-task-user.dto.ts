import { PartialType } from '@nestjs/swagger';
import { CreateTaskUserDto } from './create-task-user.dto';

export class UpdateTaskUserDto extends PartialType(CreateTaskUserDto) {}
