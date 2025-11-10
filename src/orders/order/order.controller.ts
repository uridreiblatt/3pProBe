import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  //UseGuards,
  Logger,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('order')
//@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get('findAll')
  async findAll() {
    return await this.orderService.findAll();
  }
  @Get('findAllComplete')
  @Header('Cache-Control', 'max-age=0')
  //findAll(@Request() req) {
  async findAllComplete() {
    return await this.orderService.findAllComplete();
  }

  @Get(':id')
  @Header('Cache-Control', 'max-age=0')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Get('/getOrderByBasket/:basket/:roleId')
  async getOrderByBasket(
    @Param('basket') basket: string,
    @Param('roleId') roleId: number,
  ) {
    return await this.orderService.getOrderByBasket(basket, roleId);
  }

  @Patch('/updateData/:id')
  async updateData(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.updateData(id, updateOrderDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
