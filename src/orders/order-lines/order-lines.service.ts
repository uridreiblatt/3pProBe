import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineAssemblyAidDto, UpdateOrderLineDto } from './dto/update-order-line.dto';
import { OrderLine } from './entities/order-line.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/order/entities/order.entity';
import { TaskStatus, TaskStatusEnum } from 'src/settings/task-status/entities/task-status.entity';
import { TaskUserService } from 'src/Tasks/task-user/task-user.service';
import { TaskUser } from 'src/Tasks/task-user/entities/task-user.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { TaskType, TaskTypesEnum } from 'src/settings/task-type/entities/task-type.entity';
import { EOrderUser } from '../order/enums/enum';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

@Injectable()
export class OrderLinesService {
  private readonly _taskUserService: TaskUserService;
  constructor(
    @InjectRepository(OrderLine)
    private orderLinesRepository: Repository<OrderLine>,
    @Inject(forwardRef(() => TaskUserService))
    private taskUserService: TaskUserService,
    @InjectRepository(TaskUser)
        private taskUsersRepository: Repository<TaskUser>,
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
    orderLineFromDto.Fullfilled = 0;
    orderLineFromDto.FullfilledSuperViser = 0;
    orderLineFromDto.approved = false;
     orderLineFromDto.picked = false;
     orderLineFromDto.pickingError = false;
     orderLineFromDto.pickingAid = false;
     orderLineFromDto.assemblyAid = false;

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
    const { companyId, ...rest } = updateOrderLineDto;
    const upd = {
      pickingAid: true, // updateOrderLineDto.pickingAid,
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
      createAssemblyTask.QTYtoassemble = orderLine.TBALANCE;
      createAssemblyTask.user = new User();
      createAssemblyTask.user.id = EOrderUser.unAssigned;
      createAssemblyTask.taskType = new TaskType();
      createAssemblyTask.taskType.id = TaskTypesEnum.Picking; //Picking
      //createAssemblyTask.taskType.role = 'Picking'; //Picking
      createAssemblyTask.taskStatus = new TaskStatus();
      createAssemblyTask.taskStatus.id = TaskStatusEnum.New; //new
      createAssemblyTask.company =  new Company()
      createAssemblyTask.company.id =  companyId;

        // taskUser.user.id = EOrderUser.unAssigned;
        //       taskUser.taskType = new TaskType();
        //       taskUser.taskType.id = TaskTypesEnum.Good_received;
        //       taskUser.taskStatus = new TaskStatus();
        //       taskUser.taskStatus.id = TaskStatusEnum.New;
        console.log(createAssemblyTask  )
      await this.taskUsersRepository.save(createAssemblyTask);
      await this._taskUserService.updateTaskAssignedOrder(orderLine.order.id);
    }
  }

  async updateAssemblyAid(id: string, updateOrderLineAssemblyAidDto: UpdateOrderLineAssemblyAidDto) {
    const upd = {
      assemblyAid: updateOrderLineAssemblyAidDto.assemblyAid,
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
      createAssemblyTask.QTYtoassemble = updateOrderLineAssemblyAidDto.assemblyQty;
      createAssemblyTask.user = new User();
      createAssemblyTask.user.id = EOrderUser.unAssigned;
      createAssemblyTask.taskType = new TaskType();
      createAssemblyTask.taskType.id = TaskTypesEnum.Assembly; //assembly
      //createAssemblyTask.taskType.role = TaskTypesEnum.Assembly;
      createAssemblyTask.taskStatus = new TaskStatus();
      createAssemblyTask.taskStatus.id = TaskStatusEnum.New; //new
      createAssemblyTask.taskInfo = updateOrderLineAssemblyAidDto.taskInfo;
      createAssemblyTask.cylinder = updateOrderLineAssemblyAidDto.cylinder;
      createAssemblyTask.company =  new Company()
      createAssemblyTask.company.id =  updateOrderLineAssemblyAidDto.companyId;
      await this.taskUsersRepository.save(createAssemblyTask);
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
      createAssemblyTask.user.id = EOrderUser.unAssigned;
      createAssemblyTask.taskType = new TaskType();
      createAssemblyTask.taskType.id = TaskTypesEnum.Assembly_Order; //assembly
      //createAssemblyTask.taskType.role = 'Assembly'; //assembly
      createAssemblyTask.taskStatus = new TaskStatus();
      createAssemblyTask.taskStatus.id = TaskStatusEnum.New; //new
      await this.taskUsersRepository.save(createAssemblyTask);
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
