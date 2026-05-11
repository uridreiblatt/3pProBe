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

@ApiTags('all-inventory')
@UseGuards(AuthGuard)
@Controller('all-inventory')
export class AllInventoryController {
  private readonly logger = new Logger(AllInventoryController.name);
  constructor(private readonly allInventoryService: AllInventoryService) {}

  @Post()
  async create(@Body() createTaskUserDto: CreateAllInventoryDto) {
    return await this.allInventoryService.create(createTaskUserDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.allInventoryService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const res = await this.allInventoryService.findOne(id);
    //validateCompanies (req.user.selectCompany , res.user.userCompany);
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskUserDto: UpdateAllInventoryDto,
  ) {
    return await this.allInventoryService.update(id, updateTaskUserDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const res = await this.allInventoryService.findOne(id);
    //validateCompanies (req.user.selectCompany , res.us.userCompany);
    return await this.allInventoryService.remove(id);
  }
}
