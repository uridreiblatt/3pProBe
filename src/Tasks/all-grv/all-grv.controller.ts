import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { AllGrvService } from './all-grv.service';
import { CreateAllGrvDto } from './dto/create-all-grv.dto';
import { UpdateAllGrvDto } from './dto/update-all-grv.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@Controller('all-grv')
export class AllGrvController {
  constructor(private readonly allGrvService: AllGrvService) {}

  @Get('getAllNewPoFromPriority')
  async getAllNewPoFromPriority(@CurrentCompanyId() companyId: string) {
    return await this.allGrvService.getAllNewPoFromPriority(companyId);
  }

  // @Post()
  // create(@Body() createAllGrvDto: CreateAllGrvDto) {
  //   return this.allGrvService.create(createAllGrvDto);
  // }

  @Get()
  findAll(@CurrentCompanyId() companyId: string) {
    return this.allGrvService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allGrvService.findOne(id);
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateAllGrvDto: UpdateAllGrvDto,
  ) {
    return this.allGrvService.update(id, updateAllGrvDto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allGrvService.remove(id);
  }
}
