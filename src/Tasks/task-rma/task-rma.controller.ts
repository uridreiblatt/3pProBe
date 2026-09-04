import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { TaskRmaService } from './task-rma.service';
import { CreateTaskRmaDto } from './dto/create-task-rma.dto';
import { UpdateTaskRmaDto } from './dto/update-task-rma.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@Controller('task-rma')
@ApiTags('task-rma')
@UseGuards(AuthGuard)
export class TaskRmaController {
  constructor(private readonly taskRmaService: TaskRmaService) {}

  @Post()
  create(@Body() createTaskRmaDto: CreateTaskRmaDto) {
    return this.taskRmaService.create(createTaskRmaDto);
  }

  @Get(':rmaId')
  findAll(
    @CurrentCompanyId() companyId: string,
    @Param('rmaId') rmaId: string,
  ) {
    if (!rmaId) {
      throw new BadRequestException();
    }
    return this.taskRmaService.findAll(rmaId);
  }

  @Get('findAllByRma/:rmaId')
  findAllByRma(
    @CurrentCompanyId() companyId: string,
    @Param('rmaId') rmaId: string,
  ) {
    return this.taskRmaService.findAllByRma(rmaId, companyId);
  }

  @Get(':id')
  findOne(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.taskRmaService.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateTaskRmaDto: UpdateTaskRmaDto,
  ) {
    return this.taskRmaService.update(id, updateTaskRmaDto, companyId);
  }

  @Delete(':id')
  remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.taskRmaService.remove(id, companyId);
  }
}
