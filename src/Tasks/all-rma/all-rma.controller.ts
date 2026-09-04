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
} from '@nestjs/common';
import { AllRmaService } from './all-rma.service';
import { CreateAllRmaDto } from './dto/create-all-rma.dto';
import { UpdateAllRmaDto } from './dto/update-all-rma.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('all-rma')
@Controller('all-rma')
@UseGuards(AuthGuard)
export class AllRmaController {
  constructor(private readonly allRmaService: AllRmaService) {}

  @Get('getAllNewRmaFromPriority')
  async getAllNewRmaFromPriority(@CurrentCompanyId() companyId: string) {
    return await this.allRmaService.getAllNewRmaFromPriority(companyId);
  }

  @Get('findAll')
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.allRmaService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.allRmaService.findOne(id, companyId);
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateAllRmaDto: UpdateAllRmaDto,
  ) {
    return await this.allRmaService.update(id, updateAllRmaDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return await this.allRmaService.remove(id, companyId);
  }
}
