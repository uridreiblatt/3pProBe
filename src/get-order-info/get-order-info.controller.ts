import { Controller, Get, Param, Patch } from '@nestjs/common';
import { GetOrderInfoService } from './get-order-info.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('get-order-info')
@Controller('get-order-info')
export class GetOrderInfoController {
  constructor(private readonly getOrderInfoService: GetOrderInfoService) {}

  @Get()
  async findAll(): Promise<boolean> {
    const res = await this.getOrderInfoService.findAll();
    return res;
  }

  @Patch('createShipRushDelivery/:orderId')
  async createShipRushDelivery(
    @Param('orderId') orderId: string,
  ): Promise<any> {
    const res = await this.getOrderInfoService.createShipRushDelivery(orderId);
    return res;
  }

  @Patch('createPrioritySh/:orderId')
  async createPrioritySh(@Param('orderId') orderId: string): Promise<any> {
    const res = await this.getOrderInfoService.createPrioritySh(orderId);
    return res;
  }

  // @Get('readXml')
  // async readXml(): Promise<any> {
  //   return await this.getOrderInfoService.GetPriorityShippingDoc('273536');
  // }
}
