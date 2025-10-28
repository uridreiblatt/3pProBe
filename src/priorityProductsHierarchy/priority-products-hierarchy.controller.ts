import { Controller } from '@nestjs/common';
import { PriorityProductsHierarchyService } from './priority-products-hierarchy.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('priorityProductsHierarchy')
@Controller('priorityProductsHierarchy')
export class PriorityProductsHierarchyController {
  constructor(
    private readonly priorityProductsHierarchyService: PriorityProductsHierarchyService,
  ) {}

  // @Post()
  // create(@Body() createPartsHierarchyDto: CreatePartsHierarchyDto) {
  //   return this.partsHierarchyService.create(createPartsHierarchyDto);
  // }

  // @Get()
  // findAll() {
  //   return this.priorityProductsHierarchyService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.priorityProductsHierarchyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePartsHierarchyDto: UpdatePartsHierarchyDto) {
  //   return this.partsHierarchyService.update(+id, updatePartsHierarchyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partsHierarchyService.remove(+id);
  // }
}
