import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderBoxItemsService } from './order-box-items.service';
import { CreateOrderBoxItemDto } from './dto/create-order-box-item.dto';
import { UpdateOrderBoxItemDto } from './dto/update-order-box-item.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('order-box-items')
@Controller('order-box-items')
export class OrderBoxItemsController {
  constructor(private readonly orderBoxItemsService: OrderBoxItemsService) {}

  @Post()
  create(@Body() createOrderBoxItemDto: CreateOrderBoxItemDto) {
    return this.orderBoxItemsService.create(createOrderBoxItemDto);
  }

  @Get('findOrder/:orderBoxId')
  findAll(@Param('orderBoxId') orderBoxId: string) {
    return this.orderBoxItemsService.findAll(orderBoxId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderBoxItemsService.findOne(id);
  }

  //
  @Get('order/findAllCompareOrderLines:orderId')
  findAllCompareOrderLines(@Param('orderId') orderId: string) {



    return this.orderBoxItemsService.findAllCompareOrderLines(orderId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderBoxItemDto: UpdateOrderBoxItemDto) {
    return this.orderBoxItemsService.update(id, updateOrderBoxItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderBoxItemsService.remove(id);
  }
  @Delete('order/:orderId')
  async removeByOrderId(orderId: string) {
    
    await this.orderBoxItemsService.removeByOrderId(orderId);
  }
}
