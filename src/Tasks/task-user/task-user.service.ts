import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { TaskUser } from './entities/task-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { OrderService } from 'src/orders/order/order.service';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { TaskType } from 'src/settings/task-type/entities/task-type.entity';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

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

  async findAll(companyId: string) {
    return await this.taskUsersRepository.find({
      
      where: {
        user:{ userCompany : { company: {id: companyId}}},
        taskStatus: { id: Not(5) },
      },
      relations: {
        taskStatus: true,        
        taskType: true,
        user: {userCompany : true},
      },
      order: { taskPriority: 'DESC', updatedAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    console.log(id)
    return await this.taskUsersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        taskStatus: true,
        user: {userCompany: true},
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
    let taskUser = new  TaskUser();
    taskUser = createTaskUserDto;
    taskUser.user =  new User();
    taskUser.user.id = createTaskUserDto.userId;
    taskUser.taskType =  new TaskType();
    taskUser.taskType.id = createTaskUserDto.taskTypeId;
    taskUser.taskStatus =  new TaskStatus();
    taskUser.taskStatus.id = createTaskUserDto.taskStatusId;
    taskUser.company = new Company();
    taskUser.company.id = createTaskUserDto.companyId;

    return await this.taskUsersRepository.save(taskUser);
  }

  async update(id: string, updateTaskUserDto: UpdateTaskUserDto) { 
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
