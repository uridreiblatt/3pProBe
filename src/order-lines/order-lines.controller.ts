import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { OrderLinesService } from './order-lines.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order-lines')
@Controller('order-lines')
export class OrderLinesController {
  private readonly logger = new Logger(OrderLinesController.name);
  constructor(private readonly orderLinesService: OrderLinesService) {}

  @Post()
  async create(@Body() createOrderLineDto: CreateOrderLineDto) {
    return await this.orderLinesService.create(createOrderLineDto);
  }

  @Get()
  async findAll() {
    return await this.orderLinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderLinesService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return await this.orderLinesService.update(id, updateOrderLineDto);
  }
  @Patch('updatePickingAid/:id')
  async updatePickingAid(
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return await this.orderLinesService.updatePickingAid(
      id,
      updateOrderLineDto,
    );
  }
  @Patch('updateAssemblyAid/:id')
  async updateAssemblyAid(
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return await this.orderLinesService.updateAssemblyAid(
      id,
      updateOrderLineDto,
    );
  }
  @Patch('removeAssemblyPickingAid/:id')
  removeAssemblyPickingAid(
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    throw new NotImplementedException();
    // return this.orderLinesService.removeAssemblyPickingAid(
    //   id,
    //   updateOrderLineDto,
    // );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderLinesService.remove(+id);
  }
}
