import { Controller, Get, Param, Patch,Request } from '@nestjs/common';
import { GetOrderInfoService } from './get-order-info.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('get-order-info')
@Controller('get-order-info')
export class GetOrderInfoController {
  constructor(private readonly getOrderInfoService: GetOrderInfoService) {}

  @Get()
  async GetAll(@Request() req): Promise<boolean> {
    const res = await this.getOrderInfoService.GetAll(req.user.selectCompany);
    return res;
  }

  @Patch('createShipRushDelivery/:orderId')
  async createShipRushDelivery(@Request() req,
    @Param('orderId') orderId: string,
  ): Promise<any> {
    
    const res = await this.getOrderInfoService.createShipRushDelivery(orderId, req.user.selectCompany);
    return res;
  }

  @Patch('createPrioritySh/:orderId')
  async createPrioritySh(@Request() req,@Param('orderId') orderId: string,): Promise<any> {
    const res = await this.getOrderInfoService.createPrioritySh(orderId, req.user.selectCompany);
    return res;
  }

  // @Get('readXml')
  // async readXml(): Promise<any> {
  //   return await this.getOrderInfoService.GetPriorityShippingDoc('273536');
  // }
}
