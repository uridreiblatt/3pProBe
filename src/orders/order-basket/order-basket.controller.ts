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
import { OrderBasketService } from './order-basket.service';
import { CreateOrderBasketDto } from './dto/create-order-basket.dto';
import { UpdateOrderBasketDto } from './dto/update-order-basket.dto';
import { ApiTags } from '@nestjs/swagger';
import { validateCompany } from 'src/util/validateCompany.util';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('order-basket')
@Controller('order-basket')
export class OrderBasketController {
  constructor(private readonly localService: OrderBasketService) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createBoxDto: CreateOrderBasketDto,
    @Request() req,
  ) {
    return this.localService.create(createBoxDto, companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.localService.findAll(companyId);
  }

  @Get('getOrderBasket/:idOrder')
  async getOrderBasket(
    @CurrentCompanyId() companyId: string,
    @Param('idOrder') idOrder: string,
  ) {
    return await this.localService.getOrderBasket(idOrder, companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.localService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateBoxDto: UpdateOrderBasketDto,
  ) {
    return this.localService.update(id, updateBoxDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.localService.findOne(id, companyId);
    return this.localService.remove(id, companyId);
  }
}
