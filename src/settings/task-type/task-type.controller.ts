import { Controller, Get } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('task-type')
@Controller('task-type')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @Get()
  findAll() {
    return this.taskTypeService.findAll();
  }
}
