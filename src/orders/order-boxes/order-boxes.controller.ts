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
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
//import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
@ApiTags('order-boxes')
@Controller('order-boxes')
export class OrderBoxesController {
  constructor(private readonly orderBoxesService: OrderBoxesService) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createOrderBoxDto: CreateOrderBoxDto,
  ) {
    return await this.orderBoxesService.create(createOrderBoxDto);
  }

  // @Get(':id')
  // async findAll(@Param('id') id: string) {
  //   return await this.orderBoxesService.findAll(id);
  // }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.orderBoxesService.findOne(id, companyId);
  }

  @Get('getOrderBoxes/:idOrder')
  async getOrderBoxes(
    @CurrentCompanyId() companyId: string,
    @Param('idOrder') idOrder: string,
  ) {
    return await this.orderBoxesService.getOrderBoxes(idOrder, companyId);
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderBoxDto: UpdateOrderBoxDto,
  ) {
    return await this.orderBoxesService.update(
      id,
      updateOrderBoxDto,
      companyId,
    );
  }
  @Patch('cloneBoxItems/:id')
  cloneBoxItems(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderBoxItemDto: any,
  ) {
    return this.orderBoxesService.cloneBoxItems(id, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return await this.orderBoxesService.remove(id, companyId);
  }
}
