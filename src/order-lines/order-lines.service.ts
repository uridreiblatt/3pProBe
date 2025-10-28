import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { OrderLine } from './entities/order-line.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';
import { TaskUserService } from 'src/task-user/task-user.service';
import { TaskUser } from 'src/task-user/entities/task-user.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskType } from 'src/task-type/entities/task-type.entity';

@Injectable()
export class OrderLinesService {
  private readonly _taskUserService: TaskUserService;
  constructor(
    @InjectRepository(OrderLine)
    private orderLinesRepository: Repository<OrderLine>,
    @Inject(forwardRef(() => TaskUserService))
    private taskUserService: TaskUserService,
  ) {
    this._taskUserService = taskUserService;
  }
  async create(createOrderLineDto: CreateOrderLineDto) {
    const res = this.orderLinesFromDto(createOrderLineDto);
    return await this.orderLinesRepository.save(res);
  }
  orderLinesFromDto(createOrderLineDto: CreateOrderLineDto) {
    const orderLineFromDto = new OrderLine();
    orderLineFromDto.BARCODE = createOrderLineDto.BARCODE;
    orderLineFromDto.PARTDES = createOrderLineDto.PARTDES;
    orderLineFromDto.PARTNAME = createOrderLineDto.PARTNAME;
    orderLineFromDto.TBALANCE = createOrderLineDto.TBALANCE;
    orderLineFromDto.lineRemarks = createOrderLineDto.lineRemarks;
    orderLineFromDto.prioritykline = createOrderLineDto.prioritykline;
    orderLineFromDto.priorityremarks = createOrderLineDto.priorityremarks;
    orderLineFromDto.ORDI = createOrderLineDto.ORDI;
    //orderLineFromDto.linePhotoBase64 = createOrderLineDto.linePhotoBase64;

    const order = new Order();
    order.id = createOrderLineDto.orderId;
    const taskStatus = new TaskStatus();
    taskStatus.id = 1;
    orderLineFromDto.taskStatus = taskStatus;
    orderLineFromDto.order = order;
    return orderLineFromDto;
  }
  async findAll() {
    return await this.orderLinesRepository.find({
      relations: {
        taskStatus: true,
        order: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.orderLinesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        taskStatus: true,
        order: true,
      },
    });
  }
  async findOneByOrder(
    parentId: string,
    partName: string,
    prioritykline: number,
  ) {
    return await this.orderLinesRepository.findOne({
      where: {
        PARTNAME: partName,
        prioritykline: prioritykline,
        order: { id: parentId },
      },
    });
  }

  async update(id: string, updateOrderLineDto: UpdateOrderLineDto) {
    return await this.orderLinesRepository.update(id, updateOrderLineDto);
  }
  async updatePickingAid(id: string, updateOrderLineDto: UpdateOrderLineDto) {
    await this.orderLinesRepository.update(id, updateOrderLineDto);
    const orderLine = await this.orderLinesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        order: true,
      },
    });
    if (orderLine) {
      const createAssemblyTask = new TaskUser();
      createAssemblyTask.orderid = orderLine.order.id;
      createAssemblyTask.orderlineId = orderLine.id;
      createAssemblyTask.DataInfo = orderLine.order.ORDNAME;
      createAssemblyTask.PartNumber = orderLine.PARTNAME;
      createAssemblyTask.QTYtoassemble = orderLine.TBALANCE;
      createAssemblyTask.user = new User();
      createAssemblyTask.user.id = 1000;
      createAssemblyTask.taskType = new TaskType();
      createAssemblyTask.taskType.id = 8; //Picking
      createAssemblyTask.taskType.role = 'Picking'; //Picking
      createAssemblyTask.taskStatus = new TaskStatus();
      createAssemblyTask.taskStatus.id = 1; //new
      await this._taskUserService.create(createAssemblyTask);
      await this._taskUserService.updateTaskAssignedOrder(orderLine.order.id);
    }
  }

  async updateAssemblyAid(id: string, updateOrderLineDto: any) {
    const upd = {
      assemblyAid: updateOrderLineDto.assemblyAid,
    };
    await this.orderLinesRepository.update(id, upd);
    const orderLine = await this.orderLinesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        order: true,
      },
    });
    if (orderLine) {
      const createAssemblyTask = new TaskUser();
      createAssemblyTask.orderid = orderLine.order.id;
      createAssemblyTask.orderlineId = orderLine.id;
      createAssemblyTask.DataInfo = orderLine.order.ORDNAME;
      createAssemblyTask.PartNumber = orderLine.PARTNAME;
      createAssemblyTask.QTYtoassemble = updateOrderLineDto.assemblyQty;
      createAssemblyTask.user = new User();
      createAssemblyTask.user.id = 1000;
      createAssemblyTask.taskType = new TaskType();
      createAssemblyTask.taskType.id = 1; //assembly
      createAssemblyTask.taskType.role = 'Assembly'; //assembly
      createAssemblyTask.taskStatus = new TaskStatus();
      createAssemblyTask.taskStatus.id = 1; //new
      createAssemblyTask.taskInfo = updateOrderLineDto.taskInfo;
      createAssemblyTask.cylinder = updateOrderLineDto.cylinder;
      await this._taskUserService.create(createAssemblyTask);
      await this._taskUserService.updateTaskAssignedOrder(orderLine.order.id);
    }
  }

  async removeAssemblyPickingAid(
    id: string,
    updateOrderLineDto: UpdateOrderLineDto,
  ) {
    await this.orderLinesRepository.update(id, updateOrderLineDto);
    const orderLine = await this.orderLinesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        order: true,
      },
    });
    if (orderLine) {
      const createAssemblyTask = new TaskUser();
      createAssemblyTask.orderid = orderLine.order.id;
      createAssemblyTask.orderlineId = orderLine.id;
      createAssemblyTask.DataInfo = orderLine.order.ORDNAME;
      createAssemblyTask.PartNumber = orderLine.PARTNAME;
      createAssemblyTask.QTYtoassemble = orderLine.TBALANCE;
      createAssemblyTask.user = new User();
      createAssemblyTask.user.id = 1000;
      createAssemblyTask.taskType = new TaskType();
      createAssemblyTask.taskType.id = 1; //assembly
      createAssemblyTask.taskType.role = 'Assembly'; //assembly
      createAssemblyTask.taskStatus = new TaskStatus();
      createAssemblyTask.taskStatus.id = 1; //new
      await this._taskUserService.create(createAssemblyTask);
      await this._taskUserService.updateTaskAssignedOrder(orderLine.order.id);
    }
  }

  async remove(id: number) {
    return await this.orderLinesRepository.delete(id);
  }
  async removeByOrderId(id: string) {
    // const olOrd = await this.orderLinesRepository.find({
    //   where: {
    //     order: { id: id },
    //   },
    // });
    // olOrd.forEach(async (ol) => {
    //   await this.orderLinesRepository.delete(ol.id);
    // });
    await this.orderLinesRepository.delete({ order: { id: id } });
  }
}
