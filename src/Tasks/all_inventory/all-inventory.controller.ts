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
import { ApiTags } from '@nestjs/swagger';
import {
  validateCompany,
  validateCompanies,
} from 'src/util/validateCompany.util';
import { AuthGuard } from 'src/auth/auth.guard';
import { AllInventoryService } from './all-inventory.service';
import { CreateAllInventoryDto } from './dto/create-all-inventory.dto';
import { UpdateAllInventoryDto } from './dto/update-all-inventory.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@ApiTags('all-inventory')
@UseGuards(AuthGuard)
@Controller('all-inventory')
export class AllInventoryController {
  private readonly logger = new Logger(AllInventoryController.name);
  constructor(private readonly allInventoryService: AllInventoryService) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createTaskUserDto: CreateAllInventoryDto,
  ) {
    return await this.allInventoryService.create(createTaskUserDto, companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.allInventoryService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.allInventoryService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateTaskUserDto: UpdateAllInventoryDto,
  ) {
    return await this.allInventoryService.update(
      id,
      updateTaskUserDto,
      companyId,
    );
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.allInventoryService.findOne(id, companyId);
    return await this.allInventoryService.remove(id, companyId);
  }
}
