import { Controller, Get } from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('boxes')
@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  // @Post()
  // create(@Body() createBoxDto: CreateBoxDto) {
  //   return this.boxesService.create(createBoxDto);
  // }

  @Get()
  async findAll() {
    return await this.boxesService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
  //   return this.boxesService.update(+id, updateBoxDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boxesService.remove(+id);
  // }
}
