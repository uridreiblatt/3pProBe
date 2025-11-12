import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PriorityProductsLocationsService } from './priority-products-locations.service';
import { CreatePriorityProductsLocationDto } from './dto/create-priority-products-location.dto';
import { UpdatePriorityProductsLocationDto } from './dto/update-priority-products-location.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('priority-products-locations')
@Controller('priority-products-locations')
export class PriorityProductsLocationsController {
  constructor(
    private readonly priorityProductsLocationsService: PriorityProductsLocationsService,
  ) {}

  @Post()
  create(
    @Body()
    createPriorityProductsLocationDto: CreatePriorityProductsLocationDto,
  ) {
    return this.priorityProductsLocationsService.create(
      createPriorityProductsLocationDto,
    );
  }

  @Get('findAll')
  findAll() {
    return this.priorityProductsLocationsService.findAll();
  }
  @Get('findZones')
  findZones() {
    return this.priorityProductsLocationsService.findZones();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.priorityProductsLocationsService.findOne(id);
  }

  @Get('findAllByProduct/:id')
  findAllByProduct(@Param('id') id: string) {
    return this.priorityProductsLocationsService.findAllByProduct(id);
  }
  @Get('findAllByProductName/:partName')
  findAllByProductName(@Param('partName') partName: string) {
    return this.priorityProductsLocationsService.findAllByProductName(partName);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePriorityProductsLocationDto: UpdatePriorityProductsLocationDto,
  ) {
    return this.priorityProductsLocationsService.update(
      +id,
      updatePriorityProductsLocationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priorityProductsLocationsService.remove(+id);
  }
}
