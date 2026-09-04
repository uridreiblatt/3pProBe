import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskGrvService } from './task-grv.service';
import { CreateTaskGrvDto } from './dto/create-task-grv.dto';
import { UpdateTaskGrvDto } from './dto/update-task-grv.dto';
import { SkipCookieMatch } from 'src/auth/entities/skip-cookie-match.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('Task-grv')
@Controller('task-grv')
@UseGuards(AuthGuard)
export class TaskGrvController {
  constructor(private readonly taskGrvService: TaskGrvService) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createTaskGrvDto: CreateTaskGrvDto,
  ) {
    return this.taskGrvService.create(createTaskGrvDto, companyId);
  }

  @Get('findAllByGrv/:taskUserId')
  findAllByRma(
    @CurrentCompanyId() companyId: string,
    @Param('taskUserId') taskUserId: string,
  ) {
    return this.taskGrvService.findAll(taskUserId, companyId);
  }

  @Get(':id')
  findOne(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.taskGrvService.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateTaskGrvDto: UpdateTaskGrvDto,
  ) {
    return this.taskGrvService.update(id, updateTaskGrvDto, companyId);
  }

  @Delete(':id')
  remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.taskGrvService.remove(id, companyId);
  }
}
