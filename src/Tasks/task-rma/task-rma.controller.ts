import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskRmaService } from './task-rma.service';
import { CreateTaskRmaDto } from './dto/create-task-rma.dto';
import { UpdateTaskRmaDto } from './dto/update-task-rma.dto';

@Controller('task-rma')
export class TaskRmaController {
  constructor(private readonly taskRmaService: TaskRmaService) {}

  @Post()
  create(@Body() createTaskRmaDto: CreateTaskRmaDto) {
    return this.taskRmaService.create(createTaskRmaDto);
  }

  @Get()
  findAll(@Param('rmaId') rmaId: string) {
    return this.taskRmaService.findAll(rmaId);
  }

  @Get('findAllByRma/:rmaId')
  findAllByRma(@Param('rmaId') rmaId: string) {
    return this.taskRmaService.findAll(rmaId);
  }

  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskRmaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskRmaDto: UpdateTaskRmaDto) {
    return this.taskRmaService.update(id, updateTaskRmaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskRmaService.remove(id);
  }
}
