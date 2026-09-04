import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTaskUserDto } from './dto/update-task-user.dto';
import { TaskUser } from './entities/task-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { OrderService } from 'src/orders/order/order.service';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import {
  TaskType,
  TaskTypesEnum,
} from 'src/settings/task-type/entities/task-type.entity';
import {
  TaskStatus,
  TaskStatusEnum,
} from 'src/settings/task-status/entities/task-status.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { DbLogService } from 'src/db-log/db-log.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { OrderStatusEnum } from 'src/orders/order/enums/enum';
import { TaskGrv } from '../task-grv/entities/task-grv.entity';
import { CompanyService } from 'src/usersCompanies/company/company.service';

@Injectable()
export class TaskUserService {
  private readonly _orderService: OrderService;
  private isLocked = false;
  //private comapny = "cb3007"; // add call from database settings;
  //private urlEndPoint = `/PORDERS?$filter=STATDES eq  'Sent' &$select=SUPNAME,CDES,ORDNAME,DETAILS`;

  private readonly logger = new Logger(TaskUserService.name);
  //private readonly username: string;
  //private readonly pwd: string;
  private readonly _DbLogService: DbLogService;
  private readonly _CompanyService: CompanyService;
  constructor(
    @InjectRepository(TaskUser)
    private taskUsersRepository: Repository<TaskUser>,
    @InjectRepository(TaskGrv)
    private taskGrvRepository: Repository<TaskGrv>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private DbLogService: DbLogService,
    private configService: ConfigService,
    private httpService: HttpService,
    private CompanyService: CompanyService,
  ) {
    this._orderService = orderService;
    this._DbLogService = DbLogService;
    // this.username = this.configService.get<string>("PRIORITY_USER");
    // this.pwd = this.configService.get<string>("PRIORITY_PWD");
    this._CompanyService = CompanyService;
  }

  async findAll(companyId: string) {
    //console.log('findAll task User', companyId)
    const res = await this.taskUsersRepository.find({
      where: {
        company: { id: companyId },
        taskStatus: { id: Not(TaskStatusEnum.Complete) },
      },
      relations: {
        taskStatus: true,
        taskType: true,
        user: true,
      },
      order: { taskPriority: 'DESC', updatedAt: 'ASC' },
    });
    const result = res.map((task) => {
      const { user, taskStatus, taskType, ...rest } = task;
      return {
        ...rest,
        userName: user ? `${user.userName}` : 'Unassigned',
        taskType: taskType ? `${taskType.role}` : 'Unassigned',
        taskStatus: taskStatus ? `${taskStatus.status}` : 'Unassigned',
      };
    });
    return result;
  }

  async findOne(id: string, companyId: string) {
    const res = await this.taskUsersRepository.findOne({
      where: {
        id: id,
        company: { id: companyId },
      },
      relations: {
        taskStatus: true,
        taskType: true,
        user: true,
      },
    });
    if (!res) {
      throw NotFoundException;
    }

    const { user, taskStatus, taskType, ...rest } = res;
    return {
      ...rest,
      //...user,
      userName: user ? `${user.userName}` : 'Unassigned',
      taskType: taskType ? `${taskType.role}` : 'Unassigned',
      taskStatus: taskStatus ? `${taskStatus.status}` : 'Unassigned',
    };
  }

  async findTasksOpenByOrder(orderId: string, companyId: string) {
    return await this.taskUsersRepository.findOne({
      where: {
        orderid: orderId,
        //taskStatus: { id: Not(5) }, // 5 complete
        taskStatus: { id: Not(TaskStatusEnum.Complete) }, // 5 complete
        company: { id: companyId },
      },
      relations: {
        taskStatus: true,
        user: true,
      },
    });
  }

  async findOrderTask(orderId: string, OrderLineId: string, companyId) {
    return await this.taskUsersRepository.findOne({
      where: {
        orderid: orderId,
        orderlineId: OrderLineId,
        company: { id: companyId },
      },
      relations: {
        taskStatus: true,
        user: true,
      },
    });
  }

  async create(createTaskUserDto: any, companyId: string) {
    let taskUser = new TaskUser();
    taskUser = createTaskUserDto;
    taskUser.user = new User();
    taskUser.user.id = createTaskUserDto.userId;
    taskUser.taskType = new TaskType();
    taskUser.taskType.id = createTaskUserDto.taskTypeId;
    taskUser.taskStatus = new TaskStatus();
    taskUser.taskStatus.id = createTaskUserDto.taskStatusId;
    taskUser.company = new Company();
    taskUser.company.id = companyId;
    taskUser.productName = createTaskUserDto.productName;
    taskUser.productDescription = createTaskUserDto.productDescription;

    return await this.taskUsersRepository.save(taskUser);
  }

  async update(
    id: string,
    updateTaskUserDto: UpdateTaskUserDto,
    companyId: string,
  ) {
    const { userId, taskStatusId, ...rest } = updateTaskUserDto;
    const data = {
      ...rest,
      ...(taskStatusId && { taskStatus: { id: taskStatusId } }),
      ...(userId && { user: { id: userId } }),
    };
    const res = await this.taskUsersRepository.update(
      {
        id,
        company: { id: companyId },
      },
      data,
    );

    if (!res.affected) {
      throw new NotFoundException('Task not found for this company');
    }

    await this.updateorderStatus(id, companyId);
    return res;
  }
  async updateTaskAssignedOrder(id: string, companyId: string) {
    const setOrderstatusOrderStatusEnum = {
      taskStatus: { id: OrderStatusEnum.AssistantPending }, // return status to in progress
    };
    await this._orderService.updateData(
      id,
      setOrderstatusOrderStatusEnum,
      companyId,
    );
    return true;
  }
  async updateorderStatus(id: string, companyId: string) {
    //const taskUser = await this.TaskUserToDto(id, updateTaskUserDto);
    const taskUser = await this.taskUsersRepository.findOne({
      where: {
        id: id,
        company: { id: companyId },
      },
    });
    if (!taskUser || taskUser.orderlineId === null) {
      return true;
    }
    const tasksUser = await this.taskUsersRepository.find({
      where: {
        orderid: taskUser.orderid,
        //taskStatus: { id: Not(Equal(OrderStatusEnum.AssistantPending)) },
        taskStatus: { id: Not(Equal(OrderStatusEnum.Complete)) },
      },
    });
    if (tasksUser.length > 0) return true;
    const setOrderstatus = {
      taskStatus: { id: TaskStatusEnum.Assistant_Complete }, // return status to in progress
    };
    await this._orderService.updateData(
      taskUser.orderid,
      setOrderstatus,
      companyId,
    );
    return true;
  }

  async remove(id: string, companyId: string) {
    await this.updateorderStatus(id, companyId);

    return await this.taskUsersRepository.delete({
      id,
      company: { id: companyId },
    });
  }
}
