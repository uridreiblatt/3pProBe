import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
//import { CreateOrderDto } from './dto/create-order.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { TaskStatus } from "src/settings/task-status/entities/task-status.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import { Role } from "src/usersCompanies/role/entities/role.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderLinesService } from "src/orders/order-lines/order-lines.service";
import { OrderBoxesService } from "src/orders/order-boxes/order-boxes.service";
import { OrderBasketService } from "src/orders/order-basket/order-basket.service";
import { TaskUserService } from "src/Tasks/task-user/task-user.service";
import { CreateDeliverySettingDto } from "src/shipments/delivery-setting/dto/create-delivery-setting.dto";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { role } from "src/auth/dto/create-auth.dto";
import { EOrderUser, OrderStatusEnum } from "./enums/enum";
import { rolesEnum } from "src/auth/entities/role.enum";
import { CompanyService } from "src/usersCompanies/company/company.service";
import { OrderBoxesItems } from "../order-box-items/entities/order-box-item.entity";
import { OrderBoxItemsService } from "../order-box-items/order-box-items.service";

@Injectable()
export class OrderService {
  private readonly _orderLinesService: OrderLinesService;
  private readonly _orderBoxesService: OrderBoxesService;
  private readonly _orderBoxItemsService: OrderBoxItemsService;
  private readonly _orderBasketService: OrderBasketService;
  private readonly _taskUserService: TaskUserService;
  private readonly _companyService: CompanyService;

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderBoxesItems)
    private orderBoxesItemsRepository: Repository<OrderBoxesItems>,

    private orderLinesService: OrderLinesService,
    private orderBoxesService: OrderBoxesService,
    private orderBasketService: OrderBasketService,
    @Inject(forwardRef(() => TaskUserService))
    private taskUserService: TaskUserService,
    private companyService: CompanyService,
    private orderBoxItemsService: OrderBoxItemsService
  ) {
    this._orderLinesService = orderLinesService;
    this._orderBoxesService = orderBoxesService;
    this._orderBasketService = orderBasketService;
    this._taskUserService = taskUserService;
    this._companyService = companyService;
    this._orderBoxItemsService = orderBoxItemsService;
  }

  async create(createOrderDto: CreateOrderDto, companyId: string) {
    const res = this.orderFromDto(createOrderDto, companyId);
    await this.orderRepository.save(res);
    return res;
  }
  orderFromDto(createOrderDto: CreateOrderDto, companyId: string): Order {
    const orderFromDto = new Order();
    orderFromDto.CUSTNAME = createOrderDto.CUSTNAME;
    orderFromDto.CURDATE = createOrderDto.CURDATE;
    orderFromDto.ordertext = createOrderDto.ordertext;
    orderFromDto.DETAILS = createOrderDto.DETAILS;
    orderFromDto.ShData = createOrderDto.ShData;
    orderFromDto.CUSTNO = createOrderDto.CUSTNO;
    orderFromDto.ORDNAME = createOrderDto.ORDNAME;
    orderFromDto.STCODE = createOrderDto.STCODE;
    orderFromDto.STDES = createOrderDto.STDES;
    orderFromDto.ADDRESS = createOrderDto.ADDRESS;
    orderFromDto.ADDRESS2 = createOrderDto.ADDRESS2;
    orderFromDto.ADDRESS3 = createOrderDto.ADDRESS3;
    orderFromDto.STATE = createOrderDto.STATE;
    orderFromDto.STATECODE = createOrderDto.STATECODE;
    orderFromDto.STATENAME = createOrderDto.STATENAME;
    orderFromDto.ZIP = createOrderDto.ZIP;
    orderFromDto.COUNTRYNAME = createOrderDto.COUNTRYNAME;
    orderFromDto.shipmentOrder = createOrderDto.shipmentOrder;
    orderFromDto.accountId = createOrderDto.accountId;
    orderFromDto.accountZip = createOrderDto.accountZip;
    // orderFromDto.orderPhotoBase64 = createOrderDto.orderPhotoBase64;
    // orderFromDto.orderPhotoBase64_1 = createOrderDto.orderPhotoBase64_1;
    // orderFromDto.orderPhotoBase64_2 = createOrderDto.orderPhotoBase64_2;
    orderFromDto.FAX = createOrderDto.FAX;
    orderFromDto.NAME = createOrderDto.NAME;
    orderFromDto.CUSTDES = createOrderDto.CUSTDES;
    orderFromDto.PHONENUM = createOrderDto.PHONENUM;
    orderFromDto.shipRushStatus = "new";
    orderFromDto.orderRemarks = createOrderDto.orderRemarks;
    orderFromDto.priorityOrder = 100;
    const role = new Role();
    role.id = 1; //Picker
    orderFromDto.role = role;
    const user = new User();
    user.id = createOrderDto.userId;
    const taskStatus = new TaskStatus();
    taskStatus.id = createOrderDto.taskStatusId;
    orderFromDto.taskStatus = taskStatus;
    orderFromDto.user = user;
    orderFromDto.taskStatus = taskStatus;
    orderFromDto.comapny = new Company();
    orderFromDto.comapny.id = companyId;
    return orderFromDto;
  }

  async findAllComplete(): Promise<any> {
    const queryViewFields =
      "SELECT * FROM v_orders_complete v order by v.priorityOrder ,  v.shipmentOrder , SUBSTRING( v.ORDNAME ,3,8) ";
    return await this.orderRepository.query(queryViewFields);
  }

  async findAll(companyId: string): Promise<any> {
    // const queryViewFields =
    //   'SELECT * FROM v_orders v order by v.priorityOrder ,  v.shipmentOrder , SUBSTRING( v.ORDNAME ,3,8) ';
    // return await this.orderRepository.query(queryViewFields);
    const res = await this.orderRepository.find({
      where: {
        taskStatus: { id: Not(OrderStatusEnum.Complete) },
        comapny: { id: companyId },
      },
      relations: {
        taskStatus: true,
        orderLines: true,
        user: true,
        role: true,
      },
      order: { priorityOrder: "ASC", shipmentOrder: "ASC", CURDATE: "DESC" },
    });
    const resAll = await Promise.all(
      res.map(async (ord) => {
        const result = await this.orderRepository.query(
          `SELECT IFNULL(SUM(obi.itemsCount), 0) AS total
       FROM p3pro.order_boxes_items obi
       WHERE obi.orderId = ? `,
          [ord.id]
        );
        const collected = result[0]?.total ?? 0;

        return {
          id: ord.id,
          collected: collected,
          priorityOrder: ord.priorityOrder,
          ORDNAME: ord.ORDNAME,
          CUSTDES: ord.CUSTDES,
          CUSTNAME: ord.CUSTNAME,
          CURDATE:  ord.CURDATE,

          createdAt: ord.createdAt,
          user: ord.user.userName,
          COUNTRYNAME: ord.COUNTRYNAME,
          STDES: ord.STDES,
          status: ord.taskStatus.status,
          orderLines: ord.orderLines,
          role: ord.role.roleDisplayName,
          roleId: ord.role.id,
          taskStatus: {
            status: ord.taskStatus.status,
          },
        };
      })
    );
    return resAll;
    //
  }

  async findByOrderName(orderName: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        ORDNAME: orderName,
      },
      relations: {
        taskStatus: true,
        user: true,
        role: true,
      },
    });
  }

  async FindP3UncompelteShipDocument(): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        shipRushStatus: "Pending",
      },
    });
  }
  async findOne(id: string) {
    const res = await this.orderRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        taskStatus: true,
        user: true,
        orderLines: true,
        orderBoxes: {
          boxSize: true,
        },
        //orderBasket: true,
        role: true,
      },
    });
    const orderLines = await Promise.all(
      res.orderLines.map(async (ol) => {
        const result = await this.orderRepository.query(
          `SELECT IFNULL(SUM(obi.itemsCount), 0) AS total
       FROM p3pro.order_boxes_items obi
       WHERE obi.orderId = ? AND obi.partNumber = ?`,
          [res.id, ol.BARCODE]
        );

        const collected = result[0]?.total ?? 0;

        return {
          ...ol,
          collected,
        };
      })
    );

    const resAll = {
      id: res.id,
      ORDNAME: res.ORDNAME,
      CUSTDES: res.CUSTDES,
      CUSTNAME: res.CUSTNAME,
      createdAt: res.createdAt,
      user: res.user.userName,
      COUNTRYNAME: res.COUNTRYNAME,
      ADDRESS: res.ADDRESS,
      ADDRESS2: res.ADDRESS2,
      ADDRESS3: res.ADDRESS3,
      ZIP: res.ZIP,
      STATE: res.STATE,
      STDES: res.STDES,
      status: res.taskStatus.status,
      orderNote: res.orderNote,
      ordertext: res.ordertext,
      orderLines, // ✅ real objects, not promises
      role: res.role.roleDisplayName,
      taskStatus: { status: res.taskStatus.status },
    };

    return resAll;
    //
  }

  async findOneGetOrder(id: string) {
    return await this.orderRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        taskStatus: true,
        user: true,
        orderLines: true,
        orderBoxes: {
          boxSize: true,
        },
        //orderBasket: true,
        role: true,
      },
    });
  }

  async getOrderByBasket(basket: string, roleId: number) {
    return await this.orderRepository.findOne({
      select: ["id"],
      where: {
        role: { id: roleId },
        orderBasket: { basketId: basket },
        taskStatus: { id: Not(5) },
      },
    });
  }

  async updateTrackingNumberFromShipRush(
    createDeliverySettingDto: CreateDeliverySettingDto
  ): Promise<any> {
    const res = await this.orderRepository.findOne({
      select: ["id"],
      where: {
        shipRushShipmentId: createDeliverySettingDto.shipmentId,
      },
    });
    const setTarckingNumber = {
      trackingNumber: createDeliverySettingDto.trackingNumber,
      shipRushStatus: "Complete",
    };
    return await this.orderRepository.update(res.id, setTarckingNumber);
  }

  async getOrderByShipmentIdFromShipRush(shipmentId: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        shipRushShipmentId: shipmentId,
      },
    });
  }

  async updateData(id: string, upd: any): Promise<any> {
    const { companyId, ...rest } = upd;
    return await this.orderRepository.update(id, rest);
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto): Promise<any> {
    let newRole = updateOrderDto.roleId;
    let orderStatus = updateOrderDto.taskStatus.id; // new  3-complete 2 - inproress
    let userInOrder = updateOrderDto.user.id;
    const resCompantSettings = await this._companyService.findOne(
      updateOrderDto.companyId
    );
    if (resCompantSettings.companySetting.boxItemsCount) {
      if (
        orderStatus === OrderStatusEnum.Complete &&
        newRole === rolesEnum.Packer
      ) {
        const itmQtyData = await Promise.all(
          updateOrderDto.orderLines.map(async (ol) => {
            const itm = await this.orderBoxesItemsRepository.find({
              where: { orderId: orderId, partNumber: ol.BARCODE },
            });

            return {
              itm: ol.BARCODE,
              cnt: ol.TBALANCE,
              boxitems: itm.reduce((sum, item) => sum + item.itemsCount, 0),
            };
          })
        );
        const itemQtyCheck = itmQtyData.filter(
          (itmError) => itmError.cnt !== itmError.boxitems
        );

        if (itemQtyCheck.length > 0) {
          throw new BadRequestException({
            message:
              "Incorrect qty in boxes:" +
              itemQtyCheck
                .map(
                  (x) => `${x.itm}: expected=${x.boxitems}, inBoxes=${x.cnt}`
                )
                .join(" , "),
          });
        }
      }
    }
    if (
      orderStatus === OrderStatusEnum.Complete &&
      newRole === rolesEnum.Picker
    ) {
      //findTasksOpenByOrder
      const ts = await this._taskUserService.findTasksOpenByOrder(orderId);
      if (ts !== null) {
        throw new BadRequestException("Please Close All taks for this order ", {
          cause: new Error(),
          description: "Tasks not marked as completed",
        });
      }
    }

    const Currentorder = await this.orderRepository.findOne({
      where: {
        id: orderId,
        //taskStatus: { id: Between(1000, 1001) }, // in assistent 5 asistent pending 6 asistent complete
      },
      relations: {
        taskStatus: true,
        user: true,
        role: true,
      },
    });
    if (Currentorder.role.id === newRole) {
      if (
        Currentorder.user.id !== EOrderUser.unAssigned &&
        Currentorder.user.id !== userInOrder
      ) {
        throw new BadRequestException("Order assigned to another user", {
          cause: new Error(),
          description: "Order assigned to another user",
        });
      }
    }

    if (orderStatus === OrderStatusEnum.InProgres) {
      if (
        Currentorder !== null &&
        (Currentorder.taskStatus.id === OrderStatusEnum.AssistantPending ||
          Currentorder.taskStatus.id === OrderStatusEnum.AssistantComplete)
      ) {
        orderStatus = Currentorder.taskStatus.id;
      }
    }

    if (orderStatus === OrderStatusEnum.Complete) {
      if (newRole < rolesEnum.Shipper) {
        if (newRole === rolesEnum.Picker) {
          if (!resCompantSettings.companySetting.qcRequired) {
            newRole = newRole + 1; // add qc stage line 341 will set it to shipper
          }
        }

        newRole = newRole + 1;
        orderStatus = OrderStatusEnum.New;
        userInOrder = EOrderUser.unAssigned; // unassgined
      }
    }
    if (newRole === rolesEnum.Shipper) {
      await this._orderBasketService.removeByOrderId(orderId);
    }
    const res = {
      orderPhotoBase64: updateOrderDto.orderPhotoBase64,
      orderPhotoBase64_1: updateOrderDto.orderPhotoBase64_1,
      orderPhotoBase64_2: updateOrderDto.orderPhotoBase64_2,
      priorityOrder: updateOrderDto.priorityOrder,
      orderRemarks: updateOrderDto.orderRemarks,
      ShData: updateOrderDto.ShData,
      Pallet: updateOrderDto.Pallet,
      //orderNote: updateOrderDto.orderNote,

      taskStatus: {
        id: orderStatus,
      },
      user: {
        id: userInOrder,
      },
      role: {
        id: newRole,
      },
    };
    await this.orderRepository.update(orderId, res);
    const promisesLines = updateOrderDto.orderLines.map(async (ol) => {
      const updateOrderLine = {
        Fullfilled: ol.Fullfilled,
        FullfilledSuperViser: ol.FullfilledSuperViser,
        lineRemarks: ol.lineRemarks,
        pickingError: ol.pickingError,
        approved: ol.approved,
        picked: ol.picked,
      };
      return await this._orderLinesService.update(ol.id, updateOrderLine);
    });
    await Promise.all(promisesLines);
    // const promiseBox = updateOrderDto.orderBoxes.map(async (ob) => {
    //   const updateBoxSize = {} as Boxsize;
    //   const updateOrder = {} as Order;
    //   const updateOrderBox = {} as OrderBoxes;
    //   updateOrderBox.boxweight = ob.boxweight;
    //   updateOrderBox.id = ob.id;
    //   updateBoxSize.id = ob.boxSize.id;
    //   updateOrderBox.boxSize = updateBoxSize;
    //   updateOrderBox.lineRemarks = ob.lineRemarks;
    //   updateOrderBox.boxNo = 1;
    //   updateOrder.id = orderId;
    //   updateOrderBox.order = updateOrder;
    //   const tmpBox = await this._orderBoxesService.findOne(updateOrderBox.id);
    //   if (tmpBox === undefined || tmpBox === null) {
    //     await this._orderBoxesService.create(updateOrderBox);
    //   } else {
    //     await this._orderBoxesService.update(updateOrderBox.id, updateOrderBox);
    //   }
    // });
    // await Promise.all(promiseBox);
  }

  async remove(id: string) {
    await this._orderBoxItemsService.removeByOrderId(id);
    await this._orderLinesService.removeByOrderId(id);
    await this._orderBoxesService.removeByOrderId(id);
    await this._orderBasketService.removeByOrderId(id);
    return await this.orderRepository.delete(id);
  }
}
