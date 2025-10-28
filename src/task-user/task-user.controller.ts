import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Logger,
} from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { CreateTaskUserDto } from './dto/create-task-user.dto';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('task-user')
@Controller('task-user')
export class TaskUserController {
  private readonly logger = new Logger(TaskUserController.name);
  constructor(private readonly taskUserService: TaskUserService) {}

  @Post()
  async create(@Body() createTaskUserDto: CreateTaskUserDto) {
    return await this.taskUserService.create(createTaskUserDto);
  }

  @Get()
  @Header('Cache-Control', 'max-age=0')
  async findAll() {
    return await this.taskUserService.findAll();
  }

  @Get(':id')
  @Header('Cache-Control', 'max-age=0')
  async findOne(@Param('id') id: string) {
    return await this.taskUserService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskUserDto: UpdateTaskUserDto,
  ) {
    return await this.taskUserService.update(id, updateTaskUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskUserService.remove(id);
  }
}
