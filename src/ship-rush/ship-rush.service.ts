import { Injectable, Logger } from '@nestjs/common';
import { CreateShipRushDto } from './dto/create-ship-rush.dto';
import { OrderService } from 'src/order/order.service';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Order } from 'src/order/entities/order.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ShipRush } from './entities/ship-rush.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//0436c904-xxxx-xxxx-xxxx-xxxxxxxxxxxx
//X-SHIPRUSH-SHIPPING-TOKEN
//a3673eb6-0f59-447f-ae62-aade23ec6229
//Shiprush token:
//0436c904-615c-4bb3-b41e-fcf7cd6282b8
@Injectable()
export class ShipRushService {
  private readonly logger = new Logger(ShipRushService.name);
  private readonly _orderService: OrderService;
  comapny: string;
  username: string;
  pwd: string;

  constructor(
    private orderService: OrderService,
    private httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(ShipRush)
    private ShipRushRepository: Repository<ShipRush>,
  ) {
    this._orderService = orderService;
    this.comapny = this.configService.get<string>('COMPANY') || '';
    this.username = this.configService.get<string>('PRIORITY_USER');
    this.pwd = this.configService.get<string>('PRIORITY_PWD');
  }

  async findOne(siteName: string) {
    return await this.ShipRushRepository.find({
      where: {
        siteName: siteName,
      },
    });
  }

  async create(createShipRushDto: CreateShipRushDto) {
    console.log('createShipRushDto', createShipRushDto);
    const order = await this._orderService.getOrderByShipmentIdFromShipRush(
      createShipRushDto.shipmentId,
    );

    const resPriorityUpdateDoc = await this.UpdatePriorityShippingDoc(
      order,
      createShipRushDto,
    );
    console.log('resPriorityUpdateDoc', resPriorityUpdateDoc);
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
  ) {
    const url =
      `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      this.comapny +
      `/DOCUMENTS_D`;
    const credentials = btoa(this.username + ':' + this.pwd);
    const basicAuth = 'Basic ' + credentials;
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
            //console.log('priorityt close sh error', error);
            throw `An error happened. Msg: ${JSON.stringify(error)}`;
          }),
        ),
    );
    return data;
  }
}
