import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Request,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
//import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('order')
@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto, req.c);
  }

  @Get('findAll')
  async findAll(@Request() req) {
    return await this.orderService.findAll(req.user.selectCompany);
  }
  @Get('findAllComplete')
  //findAll(@Request() req) {
  async findAllComplete(@Request() req) {
    return await this.orderService.findAllComplete(req.user.selectCompany);
  }

  @Get(':id')
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

  @Get('/getOrderBoxItems/:orderId')
  async getOrderBoxItems(@Param('orderId') orderId: string) {
    return await this.orderService.getOrderBoxItems(orderId);
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
  async remove(@Param('id') id: string, @Request() req) {
    return await this.orderService.remove(
      id,
      req.user.selectCompany,
      req.user.id,
    );
  }
}
