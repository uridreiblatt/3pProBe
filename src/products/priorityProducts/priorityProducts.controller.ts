import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { priorityProductsService } from './priorityProducts.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
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
  async getPriorityParts(@CurrentCompanyId() companyId: string) {
    await this.partsService.getPriorityParts(companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.partsService.findAll(companyId);
  }

  @Get('findOne/:id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.partsService.findOne(id, companyId);
  }

  @Get('findChildByParentPart/:id')
  async findChildByParentPart(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.partsService.findChildByParentPart(id, companyId);
  }
  // @Get('findChildByParent/:id')
  // async findChildByParent(@Param('id') id: string) {
  //   return await this.partsService.findChildByParent(id);
  // }
  @Get('findBarcode/:barcode')
  async findBarcode(
    @CurrentCompanyId() companyId: string,
    @Param('barcode') id: string,
  ) {
    const res = await this.partsService.findBarcode(id, companyId);
    return res;
  }

  @Get('findProductName/:productName') //
  async findProductName(
    @CurrentCompanyId() companyId: string,
    @Param('productName') id: string,
  ) {
    const res = await this.partsService.findProductName(id, companyId);
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
