import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderBoxItemsService } from './order-box-items.service';
import { CreateOrderBoxItemDto } from './dto/create-order-box-item.dto';
import { UpdateOrderBoxItemDto } from './dto/update-order-box-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('order-box-items')
@Controller('order-box-items')
export class OrderBoxItemsController {
  constructor(private readonly orderBoxItemsService: OrderBoxItemsService) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createOrderBoxItemDto: CreateOrderBoxItemDto,
  ) {
    return this.orderBoxItemsService.create(createOrderBoxItemDto, companyId);
  }

  @Get('findOrder/:orderBoxId')
  findAll(
    @CurrentCompanyId() companyId: string,
    @Param('orderBoxId') orderBoxId: string,
  ) {
    return this.orderBoxItemsService.findAll(orderBoxId, companyId);
  }

  @Get(':id')
  findOne(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.orderBoxItemsService.findOne(id, companyId);
  }

  //
  @Get('order/findAllCompareOrderLines:orderId')
  findAllCompareOrderLines(
    @CurrentCompanyId() companyId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderBoxItemsService.findAllCompareOrderLines(
      orderId,
      companyId,
    );
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderBoxItemDto: UpdateOrderBoxItemDto,
  ) {
    return this.orderBoxItemsService.update(
      id,
      updateOrderBoxItemDto,
      companyId,
    );
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return await this.orderBoxItemsService.remove(id, companyId);
  }

  @Delete('order/:orderId')
  async removeByOrderId(
    @CurrentCompanyId() companyId: string,
    orderId: string,
  ) {
    await this.orderBoxItemsService.removeByOrderId(orderId, companyId);
  }
}
