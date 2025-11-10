import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskGrvService } from './task-grv.service';
import { CreateTaskGrvDto } from './dto/create-task-grv.dto';
import { UpdateTaskGrvDto } from './dto/update-task-grv.dto';

@Controller('task-grv')
export class TaskGrvController {
  constructor(private readonly taskGrvService: TaskGrvService) {}

  @Post()
  create(@Body() createTaskGrvDto: CreateTaskGrvDto) {
    return this.taskGrvService.create(createTaskGrvDto);
  }

  @Get()
  findAll() {
    return this.taskGrvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskGrvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskGrvDto: UpdateTaskGrvDto) {
    return this.taskGrvService.update(+id, updateTaskGrvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskGrvService.remove(+id);
  }
}
