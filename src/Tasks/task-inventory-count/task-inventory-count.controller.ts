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
import { TaskInventoryCountService } from './task-inventory-count.service';
import { CreateTaskInventoryCountDto } from './dto/create-task-inventory-count.dto';
import { UpdateTaskInventoryCountDto } from './dto/update-task-inventory-count.dto';
import { ApiTags } from '@nestjs/swagger';
import { validateCompany } from 'src/util/validateCompany.util';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  SKIP_COOKIE_MATCH_KEY,
  SkipCookieMatch,
} from 'src/auth/entities/skip-cookie-match.decorator';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@ApiTags('Task-Inventory-Count')
@UseGuards(AuthGuard)
@Controller('Task-Inventory-Count')
export class TaskInventoryCountController {
  constructor(
    private readonly taskInventoryCountService: TaskInventoryCountService,
  ) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createTaskInventoryCountDto: CreateTaskInventoryCountDto,
  ) {
    return await this.taskInventoryCountService.create(
      createTaskInventoryCountDto,
      companyId,
    );
  }

  @Get('findAll/:id')
  async findAll(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.taskInventoryCountService.findAll(id, companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.taskInventoryCountService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateTaskInventoryCountDto: UpdateTaskInventoryCountDto,
  ) {
    return await this.taskInventoryCountService.update(
      companyId,
      id,
      updateTaskInventoryCountDto,
    );
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return await this.taskInventoryCountService.remove(companyId, id);
  }
}
