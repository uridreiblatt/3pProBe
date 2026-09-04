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
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
//import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('order')
@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.create(createOrderDto, companyId);
  }

  @Get('findAll')
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.orderService.findAll(companyId);
  }
  @Get('findAllComplete')
  //findAll(  @CurrentCompanyId() companyId: string,) {
  async findAllComplete(@CurrentCompanyId() companyId: string) {
    return await this.orderService.findAllComplete(companyId);
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
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.updateData(id, updateOrderDto, companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentCompanyId() companyId: string,
  ) {
    return await this.orderService.update(id, updateOrderDto, companyId);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.orderService.remove(
      id,
      req.user.selectCompany,
      req.user.id,
    );
  }
}
