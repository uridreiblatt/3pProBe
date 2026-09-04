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
import { ProductStatusService } from './product-status.service';
import { CreateProductStatusDto } from './dto/create-product-status.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@Controller('product-status')
export class ProductStatusController {
  constructor(private readonly productStatusService: ProductStatusService) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createProductStatusDto: CreateProductStatusDto,
  ) {
    return this.productStatusService.create(companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return this.productStatusService.findAll(companyId);
  }

  @Get(':id')
  findOne(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.productStatusService.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateProductStatusDto: UpdateProductStatusDto,
  ) {
    return this.productStatusService.update(
      id,
      updateProductStatusDto,
      companyId,
    );
  }

  @Delete(':id')
  remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.productStatusService.remove(id, companyId);
  }
}
