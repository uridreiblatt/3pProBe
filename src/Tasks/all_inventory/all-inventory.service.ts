import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
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
import { AllInventoryCount } from './entities/all-inventory.entity';
import { CreateAllInventoryDto } from './dto/create-all-inventory.dto';
import { UpdateAllInventoryDto } from './dto/update-all-inventory.dto';
import { TaskInventoryCount } from '../task-inventory-count/entities/task-inventory-count.entity';
import { CreateTaskInventoryCountDto } from '../task-inventory-count/dto/create-task-inventory-count.dto';

@Injectable()
export class AllInventoryService {
  private readonly logger = new Logger(AllInventoryService.name);

  private readonly _DbLogService: DbLogService;

  constructor(
    @InjectRepository(AllInventoryCount)
    private allInventoryCountRepository: Repository<AllInventoryCount>,
    @InjectRepository(TaskInventoryCount)
    private taskInventoryCountRepository: Repository<TaskInventoryCount>,
    private DbLogService: DbLogService,
  ) {
    this._DbLogService = DbLogService;
  }

  async findAll(companyId: string) {
    //console.log('findAll task User', companyId)
    const res = await this.allInventoryCountRepository.find({
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
        id: rest.id,
        Location: rest.Location,
        PartNumber: rest.PartNumber,
        productName: rest.productName,
        productDescription: rest.productDescription,
        DataInfo: rest.DataInfo,
        remarks: rest.remarks,
        createdAt: rest.createdAt,
        taskPriority: rest.taskPriority,
        userName: user ? `${user.userName}` : 'Unassigned',
        taskType: taskType ? `${taskType.role}` : 'Unassigned',
        taskStatus: taskStatus ? `${taskStatus.status}` : 'Unassigned',
      };
    });
    return result;
  }

  async findOne(id: string, companyId: string) {
    const res = await this.allInventoryCountRepository.findOne({
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

    const { user, taskStatus, taskType, ...rest } = res;
    return {
      ...rest,
      //...user,
      userName: user ? `${user.userName}` : 'Unassigned',
      taskType: taskType ? `${taskType.role}` : 'Unassigned',
      taskStatus: taskStatus ? `${taskStatus.status}` : 'Unassigned',
    };
  }

  async findTasksOpenByOrder(orderId: string) {
    return await this.allInventoryCountRepository.findOne({
      where: {
        orderid: orderId,
        //taskStatus: { id: Not(5) }, // 5 complete
        taskStatus: { id: Not(TaskStatusEnum.Complete) }, // 5 complete
      },
      relations: {
        taskStatus: true,
        user: true,
      },
    });
  }

  async findOrderTask(orderId: string, OrderLineId: string) {
    return await this.allInventoryCountRepository.findOne({
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

  async create(
    createAllInventoryDto: CreateAllInventoryDto,
    companyId: string,
  ) {
    let allInventoryCount = new AllInventoryCount();
    allInventoryCount.Location = createAllInventoryDto.Location;
    allInventoryCount.user = new User();
    allInventoryCount.user.id = createAllInventoryDto.userId;
    allInventoryCount.taskType = new TaskType();
    allInventoryCount.taskType.id = TaskTypesEnum.Inventory_count;
    allInventoryCount.taskStatus = new TaskStatus();
    allInventoryCount.taskStatus.id = createAllInventoryDto.taskStatusId;
    allInventoryCount.company = new Company();
    allInventoryCount.company.id = companyId;
    allInventoryCount.productName = createAllInventoryDto.productName;
    allInventoryCount.DataInfo = createAllInventoryDto.DataInfo;
    allInventoryCount.remarks = createAllInventoryDto.remarks;
    allInventoryCount.PartNumber = createAllInventoryDto.PartNumber || '';

    allInventoryCount.productDescription =
      createAllInventoryDto.productDescription;

    const resAllInventoryCount =
      await this.allInventoryCountRepository.save(allInventoryCount);
    // createAllInventoryDto.taskInventoryCountDtos?.forEach(async (item: any) => {
    //   let taskInventoryCount = new TaskInventoryCount();
    //   taskInventoryCount.allInventoryCount = new AllInventoryCount();
    //   taskInventoryCount.allInventoryCount.id =
    //     resAllInventoryCount.id || 'sdsadas';
    //   taskInventoryCount.productName = item.productName;
    //   taskInventoryCount.productDescription = item.productDescription;
    //   taskInventoryCount.location = item.location;
    //   taskInventoryCount.PartNumber = item.PartNumber;
    //   taskInventoryCount.DataInfo = item.DataInfo;

    //   const resLine =
    //     await this.taskInventoryCountRepository.save(taskInventoryCount);
    //   console.log('resLine', resLine);
    // });
    return resAllInventoryCount;
  }

  async update(
    id: string,
    updateallInventoryDto: UpdateAllInventoryDto,
    companyId: string,
  ) {
    const { userId, taskStatusId, ...rest } = updateallInventoryDto;
    const data = {
      ...rest,
      ...(taskStatusId && { taskStatus: { id: taskStatusId } }),
      ...(userId && { user: { id: userId } }),
    };
    const res = await this.allInventoryCountRepository.update(id, data);
    return res;
  }

  async remove(id: string, companyId: string) {
    await this.taskInventoryCountRepository.delete({
      allInventoryCount: { id: id, company: { id: companyId } },
    });
    return await this.allInventoryCountRepository.delete({
      id,
      company: { id: companyId },
    });
  }
}
