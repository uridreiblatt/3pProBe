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
import { PriorityProductsLocationsService } from './priority-products-locations.service';
import { CreatePriorityProductsLocationDto } from './dto/create-priority-products-location.dto';
import { UpdatePriorityProductsLocationDto } from './dto/update-priority-products-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@UseGuards(AuthGuard)
@ApiTags('priority-products-locations')
@Controller('priority-products-locations')
export class PriorityProductsLocationsController {
  constructor(
    private readonly priorityProductsLocationsService: PriorityProductsLocationsService,
  ) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body()
    createPriorityProductsLocationDto: CreatePriorityProductsLocationDto,
  ) {
    return this.priorityProductsLocationsService.create(
      createPriorityProductsLocationDto,
      companyId,
    );
  }

  @Get('findAll')
  findAll(@CurrentCompanyId() companyId: string) {
    return this.priorityProductsLocationsService.findAll(companyId);
  }
  @Get('findZones')
  findZones(@CurrentCompanyId() companyId: string) {
    return this.priorityProductsLocationsService.findZones(companyId);
  }

  @Get('findOne/:id')
  findOne(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.priorityProductsLocationsService.findOne(id, companyId);
  }

  @Get('findAllByProduct/:id')
  findAllByProduct(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return this.priorityProductsLocationsService.findAllByProduct(
      id,
      companyId,
    );
  }
  @Get('findAllByProductName/:partName')
  findAllByProductName(
    @CurrentCompanyId() companyId: string,
    @Param('partName') partName: string,
  ) {
    return this.priorityProductsLocationsService.findAllByProductName(
      partName,
      companyId,
    );
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body()
    updatePriorityProductsLocationDto: UpdatePriorityProductsLocationDto,
  ) {
    return this.priorityProductsLocationsService.update(
      id,
      updatePriorityProductsLocationDto,
      companyId,
    );
  }

  @Delete(':id')
  remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.priorityProductsLocationsService.remove(id, companyId);
  }
}
