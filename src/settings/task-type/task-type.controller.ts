import { Controller, Get, UseGuards } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/entities/role.enum';
import { Roles } from 'src/auth/entities/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.SysAdmin)
@ApiTags('task-type-ok')
@Controller('task-type')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @Get()
  findAll() {
    return this.taskTypeService.findAll();
  }
}
