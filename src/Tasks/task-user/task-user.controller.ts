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
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { CreateTaskUserDto } from './dto/create-task-user.dto';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { validateCompany } from 'src/util/validateCompany.util';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('task-user-ok')
@UseGuards(AuthGuard)
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
  async findAll(@Request() req,) {
    return await this.taskUserService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  @Header('Cache-Control', 'max-age=0')
  async findOne(@Request() req,@Param('id') id: string) {
    const res = await this.taskUserService.findOne(id);
    validateCompany (req.user.selectCompany , res.user.userCompany[0].id);
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskUserDto: UpdateTaskUserDto,
  ) {
    return await this.taskUserService.update(id, updateTaskUserDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const res = await this.taskUserService.findOne(id);
    validateCompany (req.user.selectCompany , res.user.userCompany[0].id);    
    return await this.taskUserService.remove(id);
  }
}
