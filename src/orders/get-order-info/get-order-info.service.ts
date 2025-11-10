import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RootPriority } from './dto/priority.dto';
import { OrderService } from 'src/orders/order/order.service';
import { CreateOrderDto } from 'src/orders/order/dto/create-order.dto';
import { parseString, Builder } from 'xml2js';
import { OrderLinesService } from 'src/orders/order-lines/order-lines.service';
import { CreateOrderLineDto } from 'src/orders/order-lines/dto/create-order-line.dto';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ShipmentPriorityService } from 'src/maintenence/shipment_priority/shipment_priority.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EOrderRole, EOrderStatus, EOrderUser } from 'src/orders/order/enums/enum';
import { Order } from 'src/orders/order/entities/order.entity';
import { DbLogService } from 'src/db-log/db-log.service';
import { Headertmp, RootShipRequest } from './dto/shipRushRequest.dto';
import {
  RootShipResponse,
  ShipmentClientMsgRes,
  ShipmentClientprintlablesRes,
  ShipmentClientRes,
} from './dto/shipRushResponse.dto';
import { promisify } from 'util';
import { XMLParser } from 'fast-xml-parser';
import { ShipRushService } from 'src/shipments/ship-rush/ship-rush.service';
import { ShipmentPriority } from 'src/maintenence/shipment_priority/entities/shipment_priority.entity';
import { PartCqauntService } from 'src/settings/part-cqaunt/part-cqaunt.service';
import { PartCqaunt } from 'src/settings/part-cqaunt/entities/part-cqaunt.entity';
import { CreateDbLogDto } from 'src/db-log/dto/create-db-log.dto';

@Injectable()
export class GetOrderInfoService {
  private readonly logger = new Logger(GetOrderInfoService.name);
  private readonly username: string;
  private readonly pwd: string;
  private readonly priorityShipRushUrl: string;

  private readonly comapny: string;
  private readonly _orderService: OrderService;
  private readonly _orderLinesService: OrderLinesService;
  private readonly _shipRushService: ShipRushService;
  private readonly _ShipmentPriorityService: ShipmentPriorityService;
  private readonly _DbLogService: DbLogService;
  private readonly _PartCqauntService: PartCqauntService;
  private isLocked = false;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private orderService: OrderService,
    private orderLinesService: OrderLinesService,
    private ShipmentPriorityService: ShipmentPriorityService,
    private DbLogService: DbLogService,
    private ShipRushService: ShipRushService,
    private PartCqauntService: PartCqauntService,
  ) {
    //@InjectRepository(MirshamimHeader) private mirshamimHeaderRepository: Repository<MirshamimHeader>,
    //@InjectRepository(MirshamimLines) private mirshamimLinesRepository: Repository<MirshamimLines>
    this.username = this.configService.get<string>('PRIORITY_USER');
    this.pwd = this.configService.get<string>('PRIORITY_PWD');
    this.comapny = this.configService.get<string>('COMPANY') || '';
    this.priorityShipRushUrl =
      this.configService.get<string>('PRIORITY_SPRSH_CALL_BACK') || '';
    this._orderService = orderService;
    this._orderLinesService = orderLinesService;
    this._ShipmentPriorityService = ShipmentPriorityService;
    this._DbLogService = DbLogService;
    this._shipRushService = ShipRushService;
    this._PartCqauntService = PartCqauntService;
  }
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  handleCron() {
    this.logger.log('crone Called EVERY_DAY_AT_10AM');
  }

  async findAll(): Promise<any> {
    if (this.isLocked) {
      return 'is locked';
    }

    this.isLocked = true;
    const url =
      `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      this.comapny +
      `/ORDERS?$select=CUSTNAME,CURDATE,ORDNAME,DETAILS,STCODE,STDES,ORDSTATUSDES,CDES,FBES_ACCOUNT,FBES_ZIP&$top=200&$filter=ORDSTATUSDES eq 'In Progress'&$expand=ORDERITEMS_SUBFORM($select=PARTNAME,PDES,BARCODE,TBALANCE,ORDISTATUSDES,REMARK1,KLINE,ORDI),SHIPTO2_SUBFORM, ORDERSTEXT_SUBFORM`;
    //url = `https://win01.maclocks.com/odata/Priority/tabula.ini/clpln18/ORDERS?$select=CUSTNAME,CURDATE,ORDNAME,STCODE,STDES,ORDSTATUSDES&$top=200&$filter=ORDNAME eq 'SO24E04168'&$expand=ORDERITEMS_SUBFORM($select=PARTNAME,PDES,BARCODE,TBALANCE,ORDISTATUSDES,REMARK1,KLINE),SHIPTO2_SUBFORM, ORDERSTEXT_SUBFORM`;

    const credentials = btoa(this.username + ':' + this.pwd);
    const basicAuth = 'Basic ' + credentials;
    const data = await lastValueFrom(
      this.httpService
        .get(url, {
          headers: {
            Authorization: basicAuth,
          },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((error) => {
            this.isLocked = false;
            throw `An error happened. Msg: ${JSON.stringify(error.request)}`;
          }),
        ),
    );
    const orderInfo: RootPriority = data;
    this._DbLogService.create({
      subject: 'priority orders',
      message: 'start import orders ' + orderInfo.value.length.toString(),
      level: '',
      context: '',
      metadata: '',
      companyId: 0
    });
    let LinesInserted = 0;

    orderInfo.value.forEach(async (element) => {
      if (
        element.ORDERITEMS_SUBFORM !== null &&
        element.ORDERITEMS_SUBFORM.length > 0 &&
        element.SHIPTO2_SUBFORM !== null
      ) {
        const createOrderDto: CreateOrderDto = new CreateOrderDto();
        createOrderDto.CUSTNO = element.CUSTNAME;
        createOrderDto.CUSTNAME = element.CDES;
        createOrderDto.ORDNAME = element.ORDNAME;
        createOrderDto.STCODE = element.STCODE;
        createOrderDto.DETAILS = element.DETAILS;
        createOrderDto.accountId = element.FBES_ACCOUNT;
        createOrderDto.accountZip = element.FBES_ZIP;

        createOrderDto.shipmentOrder = 1;
        const shp = await this._ShipmentPriorityService.findOneByStCode(
          createOrderDto.STCODE,
        );
        createOrderDto.shipmentOrder = shp?.priority || 1;
        createOrderDto.STDES = element.STDES;
        createOrderDto.FAX = element.SHIPTO2_SUBFORM?.FAX;
        createOrderDto.NAME = element.SHIPTO2_SUBFORM?.NAME;
        createOrderDto.CUSTDES = element.SHIPTO2_SUBFORM?.CUSTDES;
        createOrderDto.PHONENUM = element.SHIPTO2_SUBFORM?.PHONENUM;
        createOrderDto.ADDRESS = element.SHIPTO2_SUBFORM?.ADDRESS;
        createOrderDto.ADDRESS2 = element.SHIPTO2_SUBFORM?.ADDRESS2;
        createOrderDto.ADDRESS3 = element.SHIPTO2_SUBFORM?.ADDRESS3;
        createOrderDto.STATE = element.SHIPTO2_SUBFORM?.STATE;
        createOrderDto.STATECODE = element.SHIPTO2_SUBFORM?.STATECODE;
        createOrderDto.STATENAME = element.SHIPTO2_SUBFORM?.STATENAME;
        createOrderDto.ZIP = element.SHIPTO2_SUBFORM?.ZIP;
        createOrderDto.COUNTRYNAME = element.SHIPTO2_SUBFORM?.COUNTRYNAME;
        let tmpText = '';
        try {
          tmpText = element.ORDERSTEXT_SUBFORM?.TEXT;
          const ind = tmpText?.lastIndexOf('</style>') || 0;
          if (ind > 0) {
            tmpText = tmpText.substring(tmpText.lastIndexOf('</style>') + 8);
            tmpText = tmpText.replace(/<[^>]*>/g, ' ');
            tmpText = tmpText.replaceAll('&nbsp', '');
          }
        } catch (error) {
          this.logger.error(error);
        }
        createOrderDto.ordertext = tmpText;
        createOrderDto.CURDATE = element.CURDATE;
        createOrderDto.userId = EOrderUser.unAssigned;
        createOrderDto.taskStatusId = EOrderUser.unAssigned;
        const checkLines = element.ORDERITEMS_SUBFORM.find((ln) => {
          if (ln.TBALANCE > 0 && ln.ORDISTATUSDES === 'In progress')
            return true;
          return false;
        });
        if (checkLines) {
          let order: Order = null;
          const orders = await this._orderService.findByOrderName(
            createOrderDto.ORDNAME,
          );
          if (orders.length === 0) {
            try {
              order = await this._orderService.create(createOrderDto);
              LinesInserted += 1;
            } catch (error) {
              await this._DbLogService.create({
                subject: 'priority orders - create Error ' + createOrderDto.ORDNAME,
                message: JSON.stringify(error).substring(
                  JSON.stringify(error).lastIndexOf('originalError')
                ),
                level: '',
                context: '',
                metadata: '',
                companyId: 0
              });
            }
          } else {
            const NewOrder = orders.find((or) => {
              if (
                or.user.id === EOrderUser.unAssigned &&
                or.role.id === EOrderRole.Picker &&
                or.taskStatus.id === EOrderStatus.New
              )
                return true;
              return false;
            });
            const CompleteOrder = orders.find((or) => {
              if (
                or.role.id === EOrderRole.Shipper &&
                or.taskStatus.id === EOrderStatus.Complete
              )
                return true;
              return false;
            });
            const InProgressOrder = orders.find((or) => {
              if (
                or.role.id === EOrderRole.Shipper &&
                or.taskStatus.id === EOrderStatus.Complete
              )
                return false;
              if (
                or.user.id === EOrderUser.unAssigned &&
                or.role.id === EOrderRole.Picker &&
                or.taskStatus.id === EOrderStatus.New
              )
                return false;
              return true;
            });
            if (InProgressOrder !== undefined) return;
            if (NewOrder !== undefined) order = NewOrder;
            if (
              CompleteOrder !== undefined &&
              InProgressOrder === undefined &&
              NewOrder === undefined
            ) {
              try {
                order = await this._orderService.create(createOrderDto);
                LinesInserted += 1;
              } catch (error) {
                await this._DbLogService.create({
                  subject: 'priority orders - create ' + createOrderDto.ORDNAME,
                  message: JSON.stringify(error).substring(
                    JSON.stringify(error).lastIndexOf('originalError')
                  ),
                  level: '',
                  context: '',
                  metadata: '',
                  companyId: 0
                });
              }
            }
          }
          if (order === null) return;

          element.ORDERITEMS_SUBFORM.forEach(async (subForm) => {
            const orderLineExixts =
              await this._orderLinesService.findOneByOrder(
                order.id,
                subForm.PARTNAME,
                subForm.KLINE,
              );
            if (
              orderLineExixts === null &&
              order.user.id === EOrderUser.unAssigned
            ) {
              if (
                subForm.TBALANCE > 0 &&
                subForm.ORDISTATUSDES === 'In progress'
              ) {
                const createOrderLineDto: CreateOrderLineDto =
                  new CreateOrderLineDto();
                createOrderLineDto.orderId = order.id;
                createOrderLineDto.BARCODE = subForm.BARCODE;
                createOrderLineDto.PARTNAME = subForm.PARTNAME;
                createOrderLineDto.PARTDES = subForm.PDES;
                createOrderLineDto.TBALANCE = subForm.TBALANCE;
                createOrderLineDto.pickingError = false;
                createOrderLineDto.approved = false;
                createOrderLineDto.prioritykline = subForm?.KLINE;
                createOrderLineDto.priorityremarks = subForm.REMARK1;
                createOrderLineDto.ORDI = subForm.ORDI;

                if (createOrderLineDto.BARCODE !== null)
                  try {
                    await this._orderLinesService.create(createOrderLineDto);
                  } catch (error) {
                    await this._DbLogService.create({
                      subject: 'priority orders - Line create ' +
                        createOrderDto.ORDNAME,
                      message: JSON.stringify(error).substring(
                        JSON.stringify(error).lastIndexOf('originalError')
                      ),
                      level: '',
                      context: '',
                      metadata: '',
                      companyId: 0
                    });
                  }
              }
            } else {
              if (order.user.UserId === EOrderUser.unAssigned) {
                if (orderLineExixts.TBALANCE !== subForm.TBALANCE) {
                  const c_Tbalance = {
                    TBALANCE: subForm.TBALANCE,
                  };

                  try {
                    await this._orderLinesService.update(
                      orderLineExixts.id,
                      c_Tbalance,
                    );
                  } catch (error) {
                    this._DbLogService.create({
                      subject: 'priority orders - Line create ' +
                        createOrderDto.ORDNAME,
                      message: JSON.stringify(error).substring(
                        JSON.stringify(error).lastIndexOf('originalError')
                      ),
                      level: '',
                      context: '',
                      metadata: '',
                      companyId: 0
                    });
                  }
                }
              }
            }
          });
        }
      }
    });

    await this._DbLogService.create({
      subject: 'priority orders',
      message: 'end import orders orders: ' + LinesInserted.toString(),
      level: '',
      context: '',
      metadata: '',
      companyId: 0
    });
    this.isLocked = false;
    return true;
  }
  /******************************************** */
  /******************************************** */
  /******************************************** */
  /******************************************** */
  /******************************************** */
  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  async createShipRushDelivery(Id: string) {
    try {
      let userResult: ShipmentClientRes = {
        isSuccess: 'new',
        ShipmentNumber: '',
        ShipmentId: '',
        messages: [],
        printLables: [],
      };
      console.log('createShipRushDelivery');
      await this._DbLogService.create({
        subject: 'shipRush Create ',
        message: 'orderId ' + Id,
        level: '',
        context: '',
        metadata: '',
        companyId: 0
      });
      const order = await this._orderService.findOne(Id);
      if (!order) {
        throw new BadRequestException('order Not Found ', {
          cause: new Error(),
          description: 'order Not Found',
        });
      }

      if (order.shipRushStatus !== 'new') {
        throw new BadRequestException('order already in progress ', {
          cause: new Error(),
          description: 'order ' + order.ORDNAME + ' - ' + order.shipRushStatus,
        });
      }

      if (order.orderBoxes.length === 0) {
        throw new BadRequestException('order as no Boxes ', {
          cause: new Error(),
          description: 'order ' + order.ORDNAME + ' - as no Boxes',
        });
      }
      const shp = await this._ShipmentPriorityService.findOneByStCode(order.STCODE);
      if (shp === null || shp.shipRushCode === null) {
        throw new BadRequestException('order ship Rush Code not found', {
          cause: new Error(),
          description: 'order ' + order.ORDNAME + ' - ' + order.STCODE,
        });
      }
      const updrunning = {
        shipRushStatus: 'Running',
      };
      await this._orderService.updateData(Id, updrunning);

      const resPriorityCreateDoc = await this.createPriorityShippingDoc(
        order.ORDNAME,
        //shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentNumber || '',
      );
      //console.log('resPriorityCreateDoc', resPriorityCreateDoc);
      const updDOC = {
        shipRushStatus: 'Pending',
        DOCUMENT_DOC: resPriorityCreateDoc['DOC'].toString(),
        DOCUMENT_DOCNO: resPriorityCreateDoc['DOCNO'].toString(),
      };
      //console.log(updDOC);
      await this._orderService.updateData(Id, updDOC);
      //return updDOC;
      const ShipRushXml = await this.BuilddataToShipRush(order, shp);
      console.log('ShipRushXml', ShipRushXml);
      const shipRushResXml = await this.sendToShipRush(
        ShipRushXml,
        order.ORDNAME,
      );

      //       <?xml version="1.0" encoding="utf-8"?>
      // <AddOrderResponse xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      //     <OrderId>fa9eff8a-0b7e-45c9-a20d-b2e000c78f17</OrderId>
      // </AddOrderResponse>
      const shipRushRes = await this.readShipRushXmlResult(shipRushResXml);
      //console.log('shipRushRes', shipRushRes);
      if (shipRushRes.AddOrderResponse.OrderId) {
        userResult = {
          isSuccess: 'true', //shipRushRes.ShipResponse.IsSuccess,
          ShipmentNumber: shipRushRes.AddOrderResponse.OrderId,
          ShipmentId: shipRushRes.AddOrderResponse.OrderId,
          messages: [
            {
              Severity: 'Success',
              textMessage: 'Shiprush order created',
            },
          ],
          printLables: [],
        };

        const updShipRushRes = {
          shipRushStatus: 'Pending',
          shipRushShipmentId: shipRushRes.AddOrderResponse.OrderId,
          //trackingNumber: shipRushRes.AddOrderResponse.OrderId,
        };
        await this._orderService.updateData(Id, updShipRushRes);
      } else {
        const upd = {
          shipRushStatus: 'error',
        };
        await this._orderService.updateData(Id, upd);

        const errLog: CreateDbLogDto  = {
          subject: 'shipRush Create Error - ' + order.ORDNAME,
          message: 'failed to create shiprush order',
          level: '',
          context: '',
          metadata: '',
          companyId: 0
        };
        await this._DbLogService.create(errLog);

        userResult = {
          isSuccess: 'false',
          ShipmentNumber: '',
          ShipmentId: '',
          messages: [
            {
              Severity: 'Error',
              textMessage: 'Failed to create Shiprush order',
            },
          ],
          printLables: [],
        };
      }
      // if (shipRushRes.ShipResponse.IsSuccess === 'false') {
      //   const upd = {
      //     shipRushStatus: 'error',
      //   };
      //   await this._orderService.updateData(Id, upd);
      //   if (Array.isArray(shipRushRes.ShipResponse.Messages.ShippingMessage)) {
      //     shipRushRes.ShipResponse.Messages.ShippingMessage.forEach(
      //       async (c) => {
      //         const errLog = {
      //           subject: 'shipRush Create Error - ' + order.ORDNAME,
      //           message: c.Severity + '--' + c.Text,
      //         };
      //         await this._DbLogService.create(errLog);
      //       },
      //     );
      //   } else {
      //     const errLog = {
      //       subject: 'shipRush Create Error - ' + order.ORDNAME,
      //       message: JSON.stringify(
      //         shipRushRes.ShipResponse.Messages?.ShippingMessage,
      //       ),
      //     };
      //     await this._DbLogService.create(errLog);
      //   }

      //   userResult = {
      //     isSuccess: shipRushRes.ShipResponse.IsSuccess,
      //     ShipmentNumber:
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentNumber,
      //     ShipmentId:
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentId,
      //     messages: this.printMessageHelper(
      //       shipRushRes.ShipResponse.Messages.ShippingMessage,
      //     ),
      //     printLables: [],
      //   };
      // } else {
      //   userResult = {
      //     isSuccess: shipRushRes.ShipResponse.IsSuccess,
      //     ShipmentNumber:
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentNumber,
      //     ShipmentId:
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentId,
      //     messages: this.printMessageHelper(
      //       shipRushRes.ShipResponse.Messages.ShippingMessage,
      //     ),
      //     printLables: this.printLabelHelper(
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.Documents
      //         .PaperDocument,
      //     ),
      //   };

      //   const updShipRushRes = {
      //     shipRushStatus: 'Pending',
      //     shipRushShipmentId:
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentId,
      //     trackingNumber:
      //       shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentNumber,
      //   };

      //   //console.log(updShipRushRes);
      //   await this._orderService.updateData(Id, updShipRushRes);
      //   // await this.sleep(1000).then(async () => {});
      // }
      const resPriorityGetDoc = await this.GetPriorityShippingDoc(
        //order.ORDNAME,
        //resPriorityCreateDoc['DOC'].toString()
        resPriorityCreateDoc['DOC'].toString(),
      );
      //console.log('resPriorityGetDoc', resPriorityGetDoc.value);
      const docData = resPriorityGetDoc.value
        ? Array.isArray(resPriorityGetDoc.value)
          ? resPriorityGetDoc.value[0]
          : resPriorityGetDoc.value
        : resPriorityGetDoc[0];
      const resPriorityUpdateDoc = await this.UpdatePriorityShippingDoc(
        order,
        docData,
        //'shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentNumber',
        '',
      );
      console.log('resPriorityUpdateDoc', resPriorityUpdateDoc);
      // if (userResult.isSuccess === 'true') {
      //   console.log('resPriorityUpdateDoc', resPriorityUpdateDoc);
      //   const resPriorityUpdateDocFinal =
      //     await this.UpdatePriorityShippingDocFinal(docData);
      //   console.log('resPriorityUpdateDocFinal', resPriorityUpdateDocFinal);
      //   const updOrderPriority = {
      //     shipRushStatus: 'Complete',
      //     DOCUMENT_DOC: resPriorityCreateDoc['DOC'].toString(),
      //     DOCUMENT_DOCNO: resPriorityCreateDoc['DOCNO'].toString(),
      //   };
      //   console.log(updOrderPriority);
      //   await this._orderService.updateData(Id, updOrderPriority);
      // }
      return userResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
    //ShipmentNumber
    //

    //return shipRushRes;
  }

  async createPrioritySh(Id: string) {
    try {
      let userResult: ShipmentClientRes = {
        isSuccess: 'new',
        ShipmentNumber: '',
        ShipmentId: '',
        messages: [],
        printLables: [],
      };
      console.log('createPrioritySh');
      await this._DbLogService.create({
        subject: 'priority sh Create ',
        message: 'orderId ' + Id,
        level: '',
        context: '',
        metadata: '',
        companyId: 0
      });
      const order = await this._orderService.findOne(Id);
      if (!order) {
        throw new BadRequestException('order Not Found ', {
          cause: new Error(),
          description: 'order Not Found',
        });
      }

      if (order.shipRushStatus !== 'new') {
        throw new BadRequestException('order already in progress ', {
          cause: new Error(),
          description: 'order ' + order.ORDNAME + ' - ' + order.shipRushStatus,
        });
      }

      if (order.orderBoxes.length === 0) {
        throw new BadRequestException('order as no Boxes ', {
          cause: new Error(),
          description: 'order ' + order.ORDNAME + ' - as no Boxes',
        });
      }
      const shp = await this._ShipmentPriorityService.findOneByStCode(order.STCODE);
      if (shp === null || shp.shipRushCode === null) {
        throw new BadRequestException('order ship Rush Code not found', {
          cause: new Error(),
          description: 'order ' + order.ORDNAME + ' - ' + order.STCODE,
        });
      }
      const updrunning = {
        shipRushStatus: 'Running',
      };
      await this._orderService.updateData(Id, updrunning);

      const resPriorityCreateDoc = await this.createPriorityShippingDoc(
        order.ORDNAME,
      );
      //console.log('resPriorityCreateDoc', resPriorityCreateDoc);
      const updDOC = {
        shipRushStatus: 'Pending',
        DOCUMENT_DOC: resPriorityCreateDoc['DOC'].toString(),
        DOCUMENT_DOCNO: resPriorityCreateDoc['DOCNO'].toString(),
        ShData: resPriorityCreateDoc['DOCNO'].toString(),
      };
      //console.log(updDOC);
      await this._orderService.updateData(Id, updDOC);
      //return updDOC;
      const updShipRushRes = {
        shipRushStatus: 'Pending',
        shipRushShipmentId: '0',
        //trackingNumber: shipRushRes.AddOrderResponse.OrderId,
      };
      await this._orderService.updateData(Id, updShipRushRes);

      const resPriorityGetDoc = await this.GetPriorityShippingDoc(
        resPriorityCreateDoc['DOC'].toString(),
      );
      //console.log('resPriorityGetDoc', resPriorityGetDoc.value);
      const docData = resPriorityGetDoc.value
        ? Array.isArray(resPriorityGetDoc.value)
          ? resPriorityGetDoc.value[0]
          : resPriorityGetDoc.value
        : resPriorityGetDoc[0];
      const resPriorityUpdateDoc = await this.UpdatePriorityShippingDoc(
        order,
        docData,
        //'shipRushRes.ShipResponse.ShipTransaction.Shipment.ShipmentNumber',
        '',
      );
      //console.log('resPriorityUpdateDoc', resPriorityUpdateDoc);
      userResult = {
        isSuccess: 'true', //shipRushRes.ShipResponse.IsSuccess,
        ShipmentNumber: resPriorityUpdateDoc.DOCNO,
        ShipmentId: '0',
        messages: [
          {
            Severity: 'Success',
            textMessage:
              'priority Sh order created' +
              resPriorityCreateDoc['DOCNO'].toString(),
          },
        ],
        printLables: [],
      };
      console.log(userResult);
      return userResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
    //ShipmentNumber
    //

    //return shipRushRes;
  }
  async createPriorityShippingDoc(OrdName: string) {
    //https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/DOCUMENTS_D
    const url =
      `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      this.comapny +
      `/DOCUMENTS_D`;
    const credentials = btoa(this.username + ':' + this.pwd);
    const basicAuth = 'Basic ' + credentials;
    const dt = {
      ORDNAME: OrdName,
      //AIRWAYBILL: TrackingNumber,
    };
    const data = await lastValueFrom(
      this.httpService
        .post(url, dt, {
          headers: {
            Authorization: basicAuth,
          },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((error) => {
            throw new BadRequestException('Create Priority order error', {
              cause: new Error(),
              description:
                'order ' +
                OrdName +
                ' - ' +
                JSON.stringify(error.response.data),
            });
          }),
        ),
    );
    return data;
  }

  async GetPriorityShippingDoc(DOC: string): Promise<any> {
    const url =
      `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      this.comapny +
      `/DOCUMENTS_D?$filter=DOC eq ` +
      DOC +
      `&$expand=TRANSORDER_D_SUBFORM`;
    //console.log(url);
    const credentials = btoa(this.username + ':' + this.pwd);
    const basicAuth = 'Basic ' + credentials;
    const data = await lastValueFrom(
      this.httpService
        .get(url, {
          headers: {
            Authorization: basicAuth,
          },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((error) => {
            throw new BadRequestException('Update Priority SH', {
              cause: new Error(),
              description:
                'Doc ' + DOC + ' - ' + JSON.stringify(error.response.data),
            });
          }),
        ),
    );
    return data;
  }
  async UpdatePriorityShippingDoc(
    order: Order,
    ExisitingOrdName: any,
    trackingNumber: any,
  ) {
    const url =
      `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      this.comapny +
      `/DOCUMENTS_D`;
    const credentials = btoa(this.username + ':' + this.pwd);
    const basicAuth = 'Basic ' + credentials;
    const CqauntData = await this._PartCqauntService.findAll(1);
    const dt = {
      DOCNO: ExisitingOrdName.DOCNO, // order.ORDNAME,
      DOC: ExisitingOrdName.DOC, //order.DOCUMENT_DOCNO,
      AIRWAYBILL: trackingNumber,
      TRANSORDER_D_SUBFORM: ExisitingOrdName.TRANSORDER_D_SUBFORM.map((ol) => {
        return {
          KLINE: ol.KLINE,
          TRANS: ol.TRANS,
          TQUANT: this.getTbalanceHelper(
            order,
            ol.PARTNAME,
            ol.CQUANT,
            ol.MIKU_ORDI,
            CqauntData,
          ),
        };
      }),

      // order.orderLines.find((olP) => {
      //   if (olP.PARTNAME === ol.PARTNAME) return true;
      //   return false;
      // }).TBALANCE,
      //STATDES: 'Final',
      // {
      //   KLINE: 2,
      //   TRANS: 429098,
      //   TYPE: 'D',
      //   TQUANT: 2,
      // },
    };
    //console.log(url, dt);
    const data = await lastValueFrom(
      this.httpService
        .patch(url, dt, {
          headers: {
            Authorization: basicAuth,
          },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((errorPriorityUpdate) => {
            throw new BadRequestException('Update Priority SH', {
              cause: new Error(),
              description:
                'order ' +
                order +
                ' - ' +
                JSON.stringify(errorPriorityUpdate.response.data),
            });
          }),
        ),
    );
    return data;
  }

  parseStringAsync = promisify(parseString);
  getTbalanceHelper(
    order: Order,
    partName: string,
    cqount: number,
    MIKU_ORDI: number,
    partCqaunt: PartCqaunt[],
  ): number {
    // if (partName.startsWith('Ship')) return 1;
    // if (partName.startsWith('Rounding Adj')) {
    //   return cqount;
    // }
    const resCquant = partCqaunt.find((pc) => {
      if (pc.partName === partName) return true; //olP.PARTNAME === partName &&
      return false;
    });
    if (resCquant) return cqount;
    const resTbalance = order.orderLines.find((olP) => {
      if (olP.ORDI === MIKU_ORDI) return true; //olP.PARTNAME === partName &&
      return false;
    });
    if (resTbalance) return resTbalance.TBALANCE;
    return 0;
  }

  async readShipRushXmlResult(ShipRusRes: any): Promise<RootShipResponse> {
    //const tmpXml = shipRushRes;
    const result: RootShipResponse = await this.parseStringAsync(ShipRusRes, {
      explicitArray: false,
    });

    return result;
  }

  async sendToShipRush(xml: string, ORDNAME: string): Promise<any> {
    const shipRushUrl = this.configService.get<string>('SHIPRUSH_URL_WEBSITE');
    //const shipRushToken = this.configService.get<string>(
    //  'X-SHIPRUSH-SHIPPING-TOKEN',
    //);
    const url = shipRushUrl; //`https://sandbox.api.my.shiprush.com/shipmentservice.svc/shipment/ship`;

    const data = await lastValueFrom(
      this.httpService
        .post(url, xml, {
          // headers: {
          //   'X-SHIPRUSH-SHIPPING-TOKEN': shipRushToken, //'0436c904-615c-4bb3-b41e-fcf7cd6282b8',
          //   //configService.get<string>('X-SHIPRUSH-SHIPPING-TOKEN')
          // },
        })
        .pipe(
          map((resp) => {
            //console.log(resp.data);
            return resp.data;
          }),
        )
        .pipe(
          catchError((error) => {
            let errorMsg = 'Unknown error';
            try {
              const xmlParser = new XMLParser();
              const parsed = xmlParser.parse(error.response.data);

              const msg = parsed?.Error?.Message;
              const details = parsed?.Error?.Details;

              errorMsg = details + ' - ' + msg;
            } catch (parseErr) {
              // fallback if parsing fails
              errorMsg = error?.message || errorMsg;
            }
            throw new BadRequestException('Create ship Rush delivery', {
              cause: new Error(),
              description: 'order ' + ORDNAME + ' - ' + errorMsg,
            });
          }),
        ),
    );
    //const t = data as unknown as RootShipResponse;
    // if (t.ShipResponse.IsSuccess === 'true') {
    //   const dt = {
    //     trackingNumber: t.ShipResponse.ShipTransaction.Shipment.ShipmentNumber,
    //     shipRushStatus: 'sent',
    //   };
    //   await this._orderService.update(Id, dt);
    // } else {
    //   t.ShipResponse.Messages.ShippingMessage.map(async (e) => {
    //     await this._DbLogService.create({
    //       subject: 'shipRushError',
    //       message: 'error: ' + e.Severity + e.Text,
    //     });
    //   });
    // }
    return data;
    //console.log('ship res', data);
  }

  async BuilddataToShipRush(
    order: Order,
    shipmentPriority: ShipmentPriority,
  ): Promise<string> {
    const shipRushConfigs = await this._shipRushService.findOneBySite(this.comapny);
    let shipRushConfig = null;
    if (shipRushConfigs) {
      shipRushConfig = shipRushConfigs[0];
    }
    let tmpAddress = order.ADDRESS2;
    if (order.ADDRESS3) tmpAddress = tmpAddress + ' ' + order.ADDRESS3;
    let upsAcountNumbertrd = '';
    if (order.accountId) upsAcountNumbertrd = order.accountId;
    const todayDate = new Date().toISOString().slice(0, 10);
    const dt: RootShipRequest = {
      Request: {
        // ShipSettings: {
        //   PrinterShippingLabel: {
        //     AutoprintShippingLabel: 'false',
        //     LabelType: 'PDF',
        //   },
        // },
        ShipTransaction: {
          Order: {
            //CustomerPO: order.CUSTNO, //'PO123-789',
            OrderNumber: order.ORDNAME,
            //CustomerPO: '',
            //OrderId: '', //order.ORDNAME,
            PaymentStatus: 2,
            ExternalID: order.id,
          },
          Shipment: {
            HasDeliveryNotification: 1,
            DeliveryNotificationEmail: order.FAX,
            HasShipNotification: 1,
            PostbackUrl: this.priorityShipRushUrl, //'https://compl.com',
            PostbackContentType: 'Unknown',
            UnitsOfMeasureLinear: shipRushConfig.uomLength, //IN
            CustomerReference: order.ORDNAME,
            UOMWeight: shipRushConfig.uomweight,
            IsTest: '0',
            Carrier: '1',
            PickupReadyTime: todayDate + shipRushConfig.PickupReadyTime, // 'T15:00:00.000Z',
            LatestPickupTime: todayDate + shipRushConfig.LatestPickupTime, //'T17:00:00.000Z',
            ChargeType: order.accountId ? 'TPB' : 'PRE',

            // ShippingAccount: {
            //   ShippingAccountId: '00000000-0000-0000-0000-000000000000',
            // },
            Shipper3PartyBillingAddress: {
              UPSAccountNumber: upsAcountNumbertrd,
              Address: {
                PostalCode: order.accountZip,
                StateOrEmpty: '',
                Country: '',
                StateAsString: '',
                CountryAsString: '',
              },
            },
            UPSServiceType: shipmentPriority.shipRushCode,
            Package: [],
            DeliveryAddress: {
              Address: {
                Country:
                  order.COUNTRYNAME === 'United States'
                    ? 'U.S.A.'
                    : order.COUNTRYNAME,
                State: order.STATECODE,
                City: order.STATE,
                FirstName: order.NAME,
                Company: order.CUSTDES,
                Address1: order.ADDRESS,
                Address2: tmpAddress,
                PostalCode: order.ZIP,
                Phone: order.PHONENUM,
                EMail: order.FAX,
                //Delivery
              },
            },
            ShipperAddress: {
              UPSAccountNumber: shipmentPriority.shipRushAcountNumber,
              Address: {
                FirstName: shipRushConfig.Company,
                Company: shipRushConfig.Company, //'Compulocks Logistic Eu Sp.z oo',
                Address1: shipRushConfig.Address1, //'Posag 7 Panien 1 dock. 11',
                Address2: shipRushConfig.Address2,
                City: shipRushConfig.City, //'Warsaw',
                State: shipRushConfig.State, //'WA',
                Country: shipRushConfig.Country, // 'PL',
                PostalCode: shipRushConfig.PostalCode, //'02-495',
                Phone: shipRushConfig.Phone, //'+48573154581',
              },
            },
          },
        },
        // '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        // '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      },
    };

    order.orderBoxes.map((ob) => {
      let size = ['0', '0', '0'];
      if (
        !(ob.boxSize.sizeDesc === 'Custom' || ob.boxSize.sizeDesc === 'Envlope')
      ) {
        size = ob.boxSize.sizeDesc.split('x');
      }
      dt.Request.ShipTransaction.Shipment.Package.push({
        PackageActualWeight: ob.boxweight.toString(),
        PackagingType: '02',
        PkgLength: size[0].toString().trim(),
        PkgWidth: size[1].toString().trim(),
        PkgHeight: size[2].toString().trim(),
        PackageReference1: order.ORDNAME,
        PackageReference2: order.DETAILS,
        InsuranceAmount: '0',
      });
    });

    const builder = new Builder({ headless: true });
    const ret = builder.buildObject(dt.Request);
    let FinalXml = `${Headertmp}${ret}</Request>`;
    FinalXml = FinalXml.replace('<root>', '');
    FinalXml = FinalXml.replace('</root>', '');
    console.log(
      '******shipRush Xml***********',
      '*********************',
      FinalXml,
      '*****************',
    );
    return FinalXml;
  }

  printLabelHelper(dt: any) {
    if (!dt) return [];
    if (Array.isArray(dt))
      return dt.map((g) => {
        return {
          dataLabel: 'data:image/png;base64,' + g.ContentMimeEncoded,
        } as ShipmentClientprintlablesRes;
      });
    else {
      return [
        {
          dataLabel: 'data:image/png;base64,' + dt.ContentMimeEncoded,
        },
      ];
    }
  }

  printMessageHelper(dt: any) {
    if (!dt) return [];
    if (Array.isArray(dt)) {
      return dt.map((c) => {
        return {
          textMessage: c.Text,
          Severity: c.Severity,
        } as ShipmentClientMsgRes;
      });
    } else {
      return [
        {
          textMessage: JSON.stringify(dt?.ShippingMessage),
          Severity: dt?.Severity,
        },
      ];
    }
  }
}

//get priorityt document
//https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/DOCUMENTS_D?$filter=DOCNO eq 'SH25000016'
//
//post priorityt document
//https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/DOCUMENTS_D?$filter=DOCNO eq 'SH25000016'
//
//{
//  "ORDNAME": "SO25000039",
//  "AIRWAYBILL": "tst uri"
//}

//patch priorityt document
//https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/DOCUMENTS_D
//{
//  "DOCNO": "SH25000016",
//  "STATDES": "Draft"
//}
