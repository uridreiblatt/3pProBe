import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderBasketService } from './order-basket.service';
import { CreateOrderBasketDto } from './dto/create-order-basket.dto';
import { UpdateOrderBasketDto } from './dto/update-order-basket.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('order-basket')
@Controller('order-basket')
export class OrderBasketController {
  constructor(private readonly orderBasketService: OrderBasketService) {}

  @Post()
  async create(@Body() createOrderBasketDto: CreateOrderBasketDto) {
    return await this.orderBasketService.create(createOrderBasketDto);
  }

  @Get()
  async findAll() {
    return await this.orderBasketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderBasketService.findOne(id);
  }
  @Get('findByOrder/:orderId')
  async findByOrder(@Param('orderId') orderId: string) {
    return await this.orderBasketService.findByOrder(orderId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderBasketDto: UpdateOrderBasketDto,
  ) {
    return await this.orderBasketService.update(id, updateOrderBasketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderBasketService.remove(id);
  }
}
