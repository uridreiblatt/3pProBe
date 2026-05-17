import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { priorityProductsService } from './priorityProducts.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('priorityProducts')
@Controller('priorityProducts')
@UseGuards(AuthGuard)
export class PriorityProductsController {
  constructor(private readonly partsService: priorityProductsService) {}

  // @Post()
  // create(@Body() createPartDto: CreatePartDto) {
  //   return this.partsService.create(createPartDto);
  // }
  @Get('getPriorityParts')
  async getPriorityParts(@Request() req) {
    await this.partsService.getPriorityParts(req.user.selectCompany);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.partsService.findAll(req.user.selectCompany);
  }

  @Get('findOne/:id')
  async findOne(@Request() req, @Param('id') id: string) {
    return await this.partsService.findOne(id, req.user.selectCompany);
  }

  @Get('findChildByParentPart/:id')
  async findChildByParentPart(@Request() req, @Param('id') id: string) {
    return await this.partsService.findChildByParentPart(
      id,
      req.user.selectCompany,
    );
  }
  // @Get('findChildByParent/:id')
  // async findChildByParent(@Param('id') id: string) {
  //   return await this.partsService.findChildByParent(id);
  // }
  @Get('findBarcode/:barcode') //productName
  async findBarcode(@Request() req, @Param('barcode') id: string) {
    const res = await this.partsService.findBarcode(id, req.user.selectCompany);
    return res;
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
