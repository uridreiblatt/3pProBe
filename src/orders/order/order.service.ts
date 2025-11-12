import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
//import { CreateOrderDto } from './dto/create-order.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { Role } from 'src/usersCompanies/role/entities/role.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderLinesService } from 'src/orders/order-lines/order-lines.service';
import { OrderBoxesService } from 'src/orders/order-boxes/order-boxes.service';
import { OrderBasketService } from 'src/orders/order-basket/order-basket.service';
import { TaskUserService } from 'src/Tasks/task-user/task-user.service';
import { CreateShipRushDto } from 'src/shipments/ship-rush/dto/create-ship-rush.dto';

@Injectable()
export class OrderService {
  private readonly _orderLinesService: OrderLinesService;
  private readonly _orderBoxesService: OrderBoxesService;
  private readonly _orderBasketService: OrderBasketService;
  private readonly _taskUserService: TaskUserService;
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderLinesService: OrderLinesService,
    private orderBoxesService: OrderBoxesService,
    private orderBasketService: OrderBasketService,
    @Inject(forwardRef(() => TaskUserService))
    private taskUserService: TaskUserService,
  ) {
    this._orderLinesService = orderLinesService;
    this._orderBoxesService = orderBoxesService;
    this._orderBasketService = orderBasketService;
    this._taskUserService = taskUserService;
  }

  async create(createOrderDto: CreateOrderDto) {
    const res = this.orderFromDto(createOrderDto);
    await this.orderRepository.save(res);
    return res;
  }
  orderFromDto(createOrderDto: CreateOrderDto) {
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
    orderFromDto.shipRushStatus = 'new';
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
    return orderFromDto;
  }

  async findAllComplete(): Promise<any> {
    const queryViewFields =
      'SELECT * FROM v_orders_complete v order by v.priorityOrder ,  v.shipmentOrder , SUBSTRING( v.ORDNAME ,3,8) ';
    return await this.orderRepository.query(queryViewFields);
  }

  async findAll(): Promise<any> {
    const queryViewFields =
      'SELECT * FROM v_orders v order by v.priorityOrder ,  v.shipmentOrder , SUBSTRING( v.ORDNAME ,3,8) ';
    return await this.orderRepository.query(queryViewFields);
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
        shipRushStatus: 'Pending',
      },
    });
  }

  async findOne(id: string) {
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
      select: ['id'],
      where: {
        role: { id: roleId },
        orderBasket: { basketId: basket },
        taskStatus: { id: Not(5) },
      },
    });
  }

  async updateTrackingNumberFromShipRush(
    createShipRushDto: CreateShipRushDto,
  ): Promise<any> {
    const res = await this.orderRepository.findOne({
      select: ['id'],
      where: {
        shipRushShipmentId: createShipRushDto.shipmentId,
      },
    });
    const setTarckingNumber = {
      trackingNumber: createShipRushDto.trackingNumber,
      shipRushStatus: 'Complete',
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
    // const markPending = {
    //   taskStatus: {
    //     id: 6, //pending
    //   },
    // };
    return await this.orderRepository.update(id, upd);
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto): Promise<any> {
    let newRole = updateOrderDto.role.id;
    let orderStatus = updateOrderDto.taskStatus.id; // new  5-complete 2 - inproress
    let userInOrder = updateOrderDto.user.id;

    if (orderStatus === 5 && newRole === 1) {
      //findTasksOpenByOrder
      const ts = await this._taskUserService.findTasksOpenByOrder(orderId);
      if (ts !== null) {
        throw new BadRequestException('Please Close All taks for this order ', {
          cause: new Error(),
          description: 'Tasks not marked as completed',
        });
      }
    }

    const Currentorder = await this.orderRepository.findOne({
      where: {
        id: orderId,
        //taskStatus: { id: Between(1000, 1001) }, // in assistent 1000 asistent pending 1001 asistent complete
      },
      relations: {
        taskStatus: true,
        user: true,
        role: true,
      },
    });
    if (Currentorder.role.id === newRole) {
      if (Currentorder.user.id !== '1' && Currentorder.user.id !== userInOrder) {
        throw new BadRequestException('Order assigned to another user', {
          cause: new Error(),
          description: 'Order assigned to another user',
        });
      }
    }

    if (orderStatus === 2) {
      if (
        Currentorder !== null &&
        (Currentorder.taskStatus.id === 1000 ||
          Currentorder.taskStatus.id === 1001)
      ) {
        orderStatus = Currentorder.taskStatus.id;
      }
    }

    if (orderStatus === 5) {
      if (newRole < 4) {
        newRole = newRole + 1;
        orderStatus = 1;
        userInOrder = '1'; // unassgined
      }
    }
    if (newRole === 4) {
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
      orderNote: updateOrderDto.orderNote,

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
    await this._orderLinesService.removeByOrderId(id);
    await this._orderBoxesService.removeByOrderId(id);
    await this._orderBasketService.removeByOrderId(id);
    return await this.orderRepository.delete(id);
  }
}
