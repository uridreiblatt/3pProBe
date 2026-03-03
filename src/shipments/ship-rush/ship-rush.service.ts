import { Injectable, Logger } from '@nestjs/common';
import { CreateShipRushDto } from './dto/create-ship-rush.dto';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from 'src/orders/order/order.service';
import { Order } from 'src/orders/order/entities/order.entity';
import { CompanyService } from 'src/usersCompanies/company/company.service';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { DeliverySetting } from '../delivery-setting/entities/delivery-setting.entity';
//0436c904-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//X-SHIPRUSH-SHIPPING-TOKEN
//a3673eb6-0f59-447f-ae62-aade23ec6229
//Shiprush token:
//0436c904-615c-4bb3-b41e-fcf7cd6282b8
@Injectable()
export class ShipRushService {
  private readonly logger = new Logger(ShipRushService.name);
  private readonly _orderService: OrderService;
  private readonly _CompanyService: CompanyService;
  // comapny: string;
  // username: string;
  // pwd: string;

  constructor(
    private orderService: OrderService,
    private CompanyService: CompanyService,
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(DeliverySetting)
    private delivarySettingRepository: Repository<DeliverySetting>,
  ) {
    this._orderService = orderService;
    // this.comapny = this.configService.get<string>('COMPANY') || '';
    // this.username = this.configService.get<string>('PRIORITY_USER');
    // this.pwd = this.configService.get<string>('PRIORITY_PWD');
    this._CompanyService = CompanyService;
  }

  // async findOne(siteName: string) {
  //   return await this.ShipRushRepository.find({
  //     where: {
  //       siteName: siteName,
  //     },
  //   });
  // }

  async create(createShipRushDto: CreateShipRushDto) {
    
    const order = await this._orderService.getOrderByShipmentIdFromShipRush(
      createShipRushDto.shipmentId,
    );

console.log('getOrderByShipmentIdFromShipRush', order);


    const resCompantSettings = await this._CompanyService.findOne(order.comapny.id)

    try {
      const resPriorityUpdateDoc = await this.UpdatePriorityShippingDoc(
      order,
      createShipRushDto,
      resCompantSettings,
      
    );
    console.log('resPriorityUpdateDoc', resPriorityUpdateDoc);
    } catch (error) {
      console.log('resPriorityUpdateDoc', error);
    }
    
    
    const updOrderPriority = {
      trackingNumber: createShipRushDto.trackingNumber.toString(),
      shipRushStatus: 'Final',
    };
    console.log(updOrderPriority);
    await this._orderService.updateData(order.id, updOrderPriority);
  }

  async UpdatePriorityShippingDoc(
    order: Order,
    createShipRushDto: CreateShipRushDto,
    resCompantSettings: Company,
  ) {
    // const url =
    //   `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
    //   this.comapny +
    //   `/DOCUMENTS_D`;
    // const credentials = btoa(this.username + ':' + this.pwd);

    const url =
      //`https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      resCompantSettings.companySetting.priorityApiUrl +
      resCompantSettings.companySetting.priorityApiCompany +    `/DOCUMENTS_D`;
      const credentials = btoa(resCompantSettings.companySetting.priorityApiUser + ':' + resCompantSettings.companySetting.priorityApiPassword);
    
    const basicAuth = 'Basic ' + credentials;
     console.log('UpdatePriorityShippingDoc', url);
    const dt = {
      DOCNO: order.DOCUMENT_DOCNO, // order.ORDNAME,
      DOC: Number(order.DOCUMENT_DOC), //order.DOCUMENT_DOCNO,
      STATDES: 'Final',
      AIRWAYBILL: createShipRushDto.trackingNumber.toString(),
    };
    console.log('priorityt close sh', dt);
    const data = await lastValueFrom(
      this.httpService
        .patch(url, dt, {
          headers: {
            Authorization: basicAuth,
          },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((error) => {
            console.error(`An error happened(priorityt close sh error). Msg: ${JSON.stringify(error)}`);            
            throw error;
          }),
        ),
    );
    return data;
  }
}
