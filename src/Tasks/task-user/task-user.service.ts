import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { TaskUser } from './entities/task-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { OrderService } from 'src/orders/order/order.service';

@Injectable()
export class TaskUserService {
  private readonly _orderService: OrderService;
  constructor(
    @InjectRepository(TaskUser)
    private taskUsersRepository: Repository<TaskUser>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {
    this._orderService = orderService;
  }

  async findAll() {
    return await this.taskUsersRepository.find({
      relations: {
        taskStatus: true,
        user: true,
        taskType: true,
      },
      where: {
        taskStatus: { id: Not(5) },
      },
      order: { taskPriority: 'DESC', updatedAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.taskUsersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        taskStatus: true,
        user: true,
      },
    });
  }

  async findTasksOpenByOrder(orderId: string) {
    return await this.taskUsersRepository.findOne({
      where: {
        orderid: orderId,
        taskStatus: { id: Not(5) }, // 5 complete
      },
      relations: {
        taskStatus: true,
        user: true,
      },
    });
  }

  async findOrderTask(orderId: string, OrderLineId: string) {
    return await this.taskUsersRepository.findOne({
      where: {
        orderid: orderId,
        orderlineId: OrderLineId,
      },
      relations: {
        taskStatus: true,
        user: true,
      },
    });
  }

  async create(createTaskUserDto: any) {
    //const taskUser = await this.TaskUserToDto(0, createTaskUserDto);
    return await this.taskUsersRepository.save(createTaskUserDto);
  }

  async update(id: string, updateTaskUserDto: UpdateTaskUserDto) {
    //const taskUser = await this.TaskUserToDto(id, updateTaskUserDto);
    const res = await this.taskUsersRepository.update(id, updateTaskUserDto);
    await this.updateorderStatus(id);
    return res;
  }
  async updateTaskAssignedOrder(id: string) {
    const setOrderstatus = {
      taskStatus: { id: 1000 }, // return status to in progress
    };
    await this._orderService.updateData(id, setOrderstatus);
    return true;
  }
  async updateorderStatus(id: string) {
    //const taskUser = await this.TaskUserToDto(id, updateTaskUserDto);
    const taskUser = await this.taskUsersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (taskUser === undefined || taskUser.orderlineId === null) return true;
    const tasksUser = await this.taskUsersRepository.find({
      where: {
        orderid: taskUser.orderid,
        taskStatus: { id: Not(Equal(5)) },
      },
    });
    if (tasksUser.length > 0) return true;
    const setOrderstatus = {
      taskStatus: { id: 1001 }, // return status to in progress
    };
    await this._orderService.updateData(taskUser.orderid, setOrderstatus);
    return true;
  }

  async remove(id: string) {
    await this.updateorderStatus(id);
    return await this.taskUsersRepository.delete(id);
  }
}
