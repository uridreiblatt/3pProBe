import { Injectable, Logger } from '@nestjs/common';
import {
  CreateDeliverySettingDto,
  DeliverySettingDto,
} from './dto/create-delivery-setting.dto';
import { OrderService } from 'src/orders/order/order.service';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Order } from 'src/orders/order/entities/order.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DeliverySetting } from './entities/delivery-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
//0436c904-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//X-SHIPRUSH-SHIPPING-TOKEN
//a3673eb6-0f59-447f-ae62-aade23ec6229
//Shiprush token:
//0436c904-615c-4bb3-b41e-fcf7cd6282b8
@Injectable()
export class DeliverySettingService {
  private readonly logger = new Logger(DeliverySettingService.name);
  private readonly _orderService: OrderService;

  constructor(
    private orderService: OrderService,
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(DeliverySetting)
    private DeliverySettingRepository: Repository<DeliverySetting>,
  ) {
    this._orderService = orderService;
  }

  async findOneBySite(companyId: string) {
    return await this.DeliverySettingRepository.findOne({
      where: {
        company: { id: companyId },
      },
    });
  }

  async findOne(id: string) {
    return await this.DeliverySettingRepository.find({
      where: {
        id: id,
      },
    });
  }
  // async createShipRus(createDeliverySettingDto: CreateDeliverySettingDto,companyId: string,) {
  //   const order = await this._orderService.getOrderByShipmentIdFromShipRush(
  //     createDeliverySettingDto.shipmentId,
  //   );

  //   const resPriorityUpdateDoc = await this.UpdatePriorityShippingDoc(
  //     order,
  //     createDeliverySettingDto,
  //     companyId,
  //   );
  //   const updOrderPriority = {
  //     trackingNumber: createDeliverySettingDto.trackingNumber.toString(),
  //     shipRushStatus: 'Final',
  //   };

  //   await this._orderService.updateData(order.id, updOrderPriority);
  // }

  // async UpdatePriorityShippingDoc(
  //   order: Order,
  //   createDeliverySettingDto: CreateDeliverySettingDto,
  //   companyId: string,
  // ) {
  //   const resCompantSettings = await this._CompanyService.findOne(companyId);

  //   const urlEndPointPriority =
  //     resCompantSettings.companySetting.priorityApiUrl +
  //     resCompantSettings.companySetting.priorityApiCompany +
  //     `/DOCUMENTS_D`;

  //   const credentials = btoa(
  //     resCompantSettings.companySetting.priorityApiUser +
  //       ':' +
  //       resCompantSettings.companySetting.priorityApiPassword,
  //   );
  //   const basicAuth = 'Basic ' + credentials;
  //   const dt = {
  //     DOCNO: order.DOCUMENT_DOCNO, // order.ORDNAME,
  //     DOC: Number(order.DOCUMENT_DOC), //order.DOCUMENT_DOCNO,
  //     STATDES: 'Final',
  //     AIRWAYBILL: createDeliverySettingDto.trackingNumber.toString(),
  //   };
  //   const data = await lastValueFrom(
  //     this.httpService
  //       .patch(url, dt, {
  //         headers: {
  //           Authorization: basicAuth,
  //         },
  //       })
  //       .pipe(map((resp) => resp.data))
  //       .pipe(
  //         catchError((error) => {
  //           //console.log('priorityt close sh error', error);
  //           throw `An error happened. Msg: ${JSON.stringify(error)}`;
  //         }),
  //       ),
  //   );
  //   return data;
  // }

  async findAll(companyId: string) {
    return await this.DeliverySettingRepository.findOne({
      where: { company: { id: companyId } },
      //relations: {company: true}
    });
  }

  async create(deliverySettingDto: DeliverySettingDto) {
    const ins = new DeliverySetting();
    ins.Address1 = deliverySettingDto.Address1;
    ins.Address2 = deliverySettingDto.Address2;
    ins.City = deliverySettingDto.City;
    ins.Company = deliverySettingDto.Company;
    ins.Country = deliverySettingDto.Country;
    ins.FirstName = deliverySettingDto.FirstName;
    ins.Phone = deliverySettingDto.Phone;
    ins.PickupReadyTime = deliverySettingDto.PickupReadyTime;
    ins.PostalCode = deliverySettingDto.PostalCode;
    ins.State = deliverySettingDto.State;
    ins.LatestPickupTime = deliverySettingDto.LatestPickupTime;
    ins.accountId = deliverySettingDto.accountId;
    ins.siteName = deliverySettingDto.siteName;
    ins.uomLength = deliverySettingDto.uomLength;
    ins.uomweight = deliverySettingDto.uomweight;
    ins.upsAcountNumber = deliverySettingDto.upsAcountNumber;
    ins.company = new Company();
    ins.company.id = deliverySettingDto.companyId;

    return await this.DeliverySettingRepository.save(ins);
  }
  async update(id: string, deliverySettingDto: DeliverySettingDto) {
    const ins = new DeliverySetting();
    ins.Address1 = deliverySettingDto.Address1;
    ins.Address2 = deliverySettingDto.Address2;
    ins.City = deliverySettingDto.City;
    ins.Company = deliverySettingDto.Company;
    ins.Country = deliverySettingDto.Country;
    ins.FirstName = deliverySettingDto.FirstName;
    ins.Phone = deliverySettingDto.Phone;
    ins.PickupReadyTime = deliverySettingDto.PickupReadyTime;
    ins.PostalCode = deliverySettingDto.PostalCode;
    ins.State = deliverySettingDto.State;
    ins.LatestPickupTime = deliverySettingDto.LatestPickupTime;
    ins.accountId = deliverySettingDto.accountId;
    ins.siteName = deliverySettingDto.siteName;
    ins.uomLength = deliverySettingDto.uomLength;
    ins.uomweight = deliverySettingDto.uomweight;
    ins.upsAcountNumber = deliverySettingDto.upsAcountNumber;
    ins.company = new Company();
    ins.company.id = deliverySettingDto.companyId;
    return await this.DeliverySettingRepository.update(id, ins);
  }
  async remove(id: string) {
    return await this.DeliverySettingRepository.delete(id);
  }
}
