import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { DeliverySettingService } from './delivery-setting.service';
//import { CreateShipRushDto } from './dto/create-ship-rush.dto';
import { ApiTags } from '@nestjs/swagger';
import { XMLParser } from 'fast-xml-parser';

import { CreatePartCqauntDto } from 'src/settings/part-cqaunt/dto/create-part-cqaunt.dto';
import { UpdateRoleDto } from 'src/usersCompanies/role/dto/update-role.dto';
import { DeliverySettingDto } from './dto/create-delivery-setting.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('delivery-setting')
@Controller('delivery-setting')
@UseGuards(AuthGuard)
export class DeliverySettingController {
  private readonly parser = new XMLParser();
  constructor(
    private readonly deliverySettingService: DeliverySettingService,
  ) {}

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.deliverySettingService.findOne(id, companyId);
  }
  @Get('/findOneBySite/:id')
  async findOneBySite(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return await this.deliverySettingService.findOneBySite(companyId);
  }

  // @Post()
  // async handleXml(@Req() req: Request) {
  //   //console.log('handleXml', req);
  //   const xml = await this.getRawBody(req); // read stream

  //   const parsed = await this.parser.parse(xml);
  //   console.log('handleXml-Shipment', parsed.Request.ShipTransaction.Shipment);
  //   console.log('handleXml-Order', parsed.Request.ShipTransaction.Order);
  //   const createShipRushDto: CreateShipRushDto = {
  //     shipmentId: parsed.Request.ShipTransaction.Order.OrderId,
  //     trackingNumber: parsed.Request.ShipTransaction.Shipment.ShipmentNumber,
  //     status: '',
  //     carrier: '',
  //   };
  //   console.log('createShipRushDto', createShipRushDto);
  //   await this.shipRushService.createShipRus(createShipRushDto);
  //   return;
  // }

  // private async getRawBody(req: Request): Promise<string> {
  //   const stream = req as unknown as IncomingMessage;

  //   return new Promise((resolve, reject) => {
  //     let data = '';
  //     stream.setEncoding('utf8');

  //     stream.on('data', (chunk) => (data += chunk));
  //     stream.on('end', () => resolve(data));
  //     stream.on('error', (err) => reject(err));
  //   });
  // }

  @Get()
  findAll(@CurrentCompanyId() companyId: string) {
    return this.deliverySettingService.findAll(companyId);
  }

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() deliverySettingDto: DeliverySettingDto,
  ) {
    return this.deliverySettingService.create(deliverySettingDto, companyId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.shipRushService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() deliverySettingDto: DeliverySettingDto,
  ) {
    return this.deliverySettingService.update(
      id,
      deliverySettingDto,
      companyId,
    );
  }

  @Delete(':id')
  remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.deliverySettingService.remove(id, companyId);
  }
}
