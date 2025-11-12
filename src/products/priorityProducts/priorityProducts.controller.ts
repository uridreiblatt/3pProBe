import { Controller, Get, Param } from '@nestjs/common';
import { priorityProductsService } from './priorityProducts.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('priorityProducts')
@Controller('priorityProducts')
export class PriorityProductsController {
  constructor(private readonly partsService: priorityProductsService) {}

  // @Post()
  // create(@Body() createPartDto: CreatePartDto) {
  //   return this.partsService.create(createPartDto);
  // }

  @Get()
  async findAll() {
    return await this.partsService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Get('findChildByParentPart/:id')
  async findChildByParentPart(@Param('id') id: string) {
    return await this.partsService.findChildByParentPart(id);
  }
  @Get('findChildByParent/:id')
  async findChildByParent(@Param('id') id: string) {
    return await this.partsService.findChildByParent(id);
  }
  @Get('findBarcode/:barcode')
  async findBarcode(@Param('barcode') id: string) {
    return await this.partsService.findBarcode(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
  //   return this.partsService.update(+id, updatePartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partsService.remove(+id);
  //}
}
