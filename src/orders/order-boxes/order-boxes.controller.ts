import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { OrderBoxesService } from './order-boxes.service';
import { CreateOrderBoxDto } from './dto/create-order-box.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
//import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
@ApiTags('order-boxes')
@Controller('order-boxes')
export class OrderBoxesController {
  constructor(private readonly orderBoxesService: OrderBoxesService) {}

  @Post()
  async create(@Body() createOrderBoxDto: CreateOrderBoxDto) {
    return await this.orderBoxesService.create(createOrderBoxDto);
  }

  @Get()
  async findAll() {
    return await this.orderBoxesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderBoxesService.findOne(id);
  }

  @Get('getOrderBoxes/:idOrder')
  async getOrderBoxes(@Param('idOrder') idOrder: string) {
    return await this.orderBoxesService.getOrderBoxes(idOrder);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderBoxDto: UpdateOrderBoxDto,
  ) {
    return await this.orderBoxesService.update(id, updateOrderBoxDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderBoxesService.remove(id);
  }
}
