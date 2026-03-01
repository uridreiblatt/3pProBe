import { Controller, Get, Post, Body, Patch, Param, Delete,Request } from '@nestjs/common';
import { ProductStatusService } from './product-status.service';
import { CreateProductStatusDto } from './dto/create-product-status.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';

@Controller('product-status')
export class ProductStatusController {
  constructor(private readonly productStatusService: ProductStatusService) {}

  @Post()
  create(@Body() createProductStatusDto: CreateProductStatusDto) {
    return this.productStatusService.create(createProductStatusDto);
  }

  @Get()
   async findAll(@Request() req  ) {    
    return this.productStatusService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productStatusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductStatusDto: UpdateProductStatusDto) {
    return this.productStatusService.update(id, updateProductStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productStatusService.remove(id);
  }
}
