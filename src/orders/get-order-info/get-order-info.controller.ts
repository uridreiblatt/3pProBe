import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { GetOrderInfoService } from './get-order-info.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderBasketDto } from '../order-basket/dto/update-order-basket.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('get-order-info')
@Controller('get-order-info')
export class GetOrderInfoController {
  constructor(private readonly getOrderInfoService: GetOrderInfoService) {}

  @Get()
  async GetAll(@CurrentCompanyId() companyId: string): Promise<boolean> {
    const res = await this.getOrderInfoService.GetAll(companyId);
    return res;
  }

  @Patch('createShipRushDelivery/:orderId')
  async createShipRushDelivery(
    @CurrentCompanyId() companyId: string,
    @Param('orderId') orderId: string,
    @Body() createShipRushDelivery: UpdateOrderBasketDto,
  ): Promise<any> {
    const res = await this.getOrderInfoService.createShipRushDelivery(
      orderId,
      companyId,
    );
    return res;
  }

  @Patch('createPrioritySh/:orderId')
  async createPrioritySh(
    @CurrentCompanyId() companyId: string,
    @Param('orderId') orderId: string,
  ): Promise<any> {
    const res = await this.getOrderInfoService.createPrioritySh(
      orderId,
      companyId,
    );
    return res;
  }

  // @Get('readXml')
  // async readXml(): Promise<any> {
  //   return await this.getOrderInfoService.GetPriorityShippingDoc('273536');
  // }
}
