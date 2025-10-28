import { Controller, Get } from '@nestjs/common';
import { CylinderService } from './cylinder.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('cylinder')
@ApiTags('cylinder')
export class CylinderController {
  constructor(private readonly cylinderService: CylinderService) {}

  // @Post()
  // create(@Body() createCylinderDto: CreateCylinderDto) {
  //   return this.cylinderService.create(createCylinderDto);
  // }

  @Get()
  findAll() {
    return this.cylinderService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cylinderService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCylinderDto: UpdateCylinderDto) {
  //   return this.cylinderService.update(+id, updateCylinderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cylinderService.remove(+id);
  // }
}
