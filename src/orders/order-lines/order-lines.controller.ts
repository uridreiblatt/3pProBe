import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Request,
  NotImplementedException,
  UseGuards,
} from '@nestjs/common';
import { OrderLinesService } from './order-lines.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import {
  UpdateOrderLineAssemblyAidDto,
  UpdateOrderLineDto,
} from './dto/update-order-line.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@ApiTags('order-lines')
@Controller('order-lines')
@UseGuards(AuthGuard)
export class OrderLinesController {
  private readonly logger = new Logger(OrderLinesController.name);
  constructor(private readonly orderLinesService: OrderLinesService) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createOrderLineDto: CreateOrderLineDto,
  ) {
    return await this.orderLinesService.create(createOrderLineDto);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.orderLinesService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.orderLinesService.findOne(id, companyId);
  }

  @Patch('update/:id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return await this.orderLinesService.update(
      id,
      updateOrderLineDto,
      companyId,
    );
  }
  @Patch('updatePickingAid/:id')
  async updatePickingAid(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return await this.orderLinesService.updatePickingAid(
      id,
      updateOrderLineDto,
      companyId,
    );
  }
  @Patch('updateAssemblyAid/:id')
  async updateAssemblyAid(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateOrderLineAssemblyAidDto: UpdateOrderLineAssemblyAidDto,
  ) {
    return await this.orderLinesService.updateAssemblyAid(
      id,
      updateOrderLineAssemblyAidDto,
      companyId,
    );
  }
  @Patch('removeAssemblyPickingAid/:id')
  removeAssemblyPickingAid(
    @CurrentCompanyId() companyId: string,
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
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return await this.orderLinesService.remove(id, companyId);
  }
}
