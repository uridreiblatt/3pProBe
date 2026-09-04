import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { CreateTaskUserDto } from './dto/create-task-user.dto';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  validateCompany,
  validateCompanies,
} from 'src/util/validateCompany.util';
import { AuthGuard } from 'src/auth/auth.guard';
import { comapny } from 'src/auth/dto/create-auth.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@ApiTags('task-user')
@UseGuards(AuthGuard)
@Controller('task-user')
export class TaskUserController {
  private readonly logger = new Logger(TaskUserController.name);
  constructor(private readonly taskUserService: TaskUserService) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createTaskUserDto: CreateTaskUserDto,
  ) {
    return await this.taskUserService.create(createTaskUserDto, companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.taskUserService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.taskUserService.findOne(id, companyId);
    //validateCompanies (companyId , res.user.userCompany);
    return res;
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateTaskUserDto: UpdateTaskUserDto,
  ) {
    return await this.taskUserService.update(id, updateTaskUserDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.taskUserService.findOne(id, companyId);
    //validateCompanies (companyId , res.us.userCompany);
    return await this.taskUserService.remove(id, companyId);
  }
}
