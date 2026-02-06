import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { UpdateTaskUserDto } from "./dto/update-task-user.dto";
import { TaskUser } from "./entities/task-user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Not, Repository } from "typeorm";
import { OrderService } from "src/orders/order/order.service";
import { User } from "src/usersCompanies/users/entities/user.entity";
import {
  TaskType,
  TaskTypesEnum,
} from "src/settings/task-type/entities/task-type.entity";
import {
  TaskStatus,
  TaskStatusEnum,
} from "src/settings/task-status/entities/task-status.entity";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { DbLogService } from "src/db-log/db-log.service";
import { catchError, lastValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { CreateTaskUserDto, RootPoPriority } from "./dto/create-task-user.dto";
import { ConfigService } from "@nestjs/config";
import { EOrderUser, OrderStatusEnum } from "src/orders/order/enums/enum";
import { TaskGrv } from "../task-grv/entities/task-grv.entity";
import { CompanyService } from "src/usersCompanies/company/company.service";
import { syncBuiltinESMExports } from "module";
import { Cron, CronExpression } from "@nestjs/schedule";

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
    private CompanyService: CompanyService
  ) {
    this._orderService = orderService;
    this._DbLogService = DbLogService;
    // this.username = this.configService.get<string>("PRIORITY_USER");
    // this.pwd = this.configService.get<string>("PRIORITY_PWD");
    this._CompanyService = CompanyService;
  }


    @Cron(CronExpression.EVERY_10_MINUTES)
    async handleCron() {
      this.logger.log('crone Called EVERY_DAY_AT_10AM getAllNewPoFromPriority');
      const companies = await this._CompanyService.findAll();
      companies.map(async (e)=>{
         await this.SyncAllNewPoFromPriority(e.id);

      })
    }

  async getAllNewPoFromPriority(companyId: string): Promise<any> {
    
    return await this.SyncAllNewPoFromPriority(companyId);
  }

  async SyncAllNewPoFromPriority(companyId: string): Promise<any> {
    if (this.isLocked) {
      return "is locked";
    }

    try {
      this.isLocked = true;
      const resCompantSettings = await this._CompanyService.findOne(companyId);

      //const urlEndPoint = `/PORDERS?$filter=STATDES eq  'Sent' &$select=SUPNAME,CDES,ORDNAME,DETAILS&$expand=PORDERITEMS_SUBFORM($select=PARTNAME,PDES,TQUANT)`;
      const urlEndPoint = `/PORDERS?$filter=STATDES eq  '${resCompantSettings.companySetting.priorityPoStatus}' &$select=SUPNAME,CDES,ORDNAME,DETAILS&$expand=PORDERITEMS_SUBFORM($select=PARTNAME,PDES,TQUANT,BARCODE)`;
      const url =
        //`https://win01.maclocks.com/odata/Priority/tabula.ini/` +
        resCompantSettings.companySetting.priorityApiUrl +
        resCompantSettings.companySetting.priorityApiCompany +
        urlEndPoint;
      // const url =
      //   `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      //   this.comapny +
      //   this.urlEndPoint;
      //const credentials = btoa(this.username + ":" + this.pwd);
      const credentials = btoa(
        resCompantSettings.companySetting.priorityApiUser +
          ":" +
          resCompantSettings.companySetting.priorityApiPassword
      );
      const basicAuth = "Basic " + credentials;

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
              console.log(
                `An error happened. Msg: ${JSON.stringify(error.request)}`
              );
              throw `An error happened. Msg: ${JSON.stringify(error.request)}`;
            })
          )
      );
      const GrvInfo: RootPoPriority = data;
      this._DbLogService.create({
        subject: "priority Po",
        message: "start import Po: " + GrvInfo.value.length.toString(),
        level: "",
        context: "",
        metadata: "",
        companyId: companyId,
      });
      let LinesInserted = 0;

      GrvInfo.value.forEach(async (element) => {
        if (element !== null) {
          let taskUser = new TaskUser();
          taskUser.orderName = element.ORDNAME;
          taskUser.DataInfo = element.CDES;
          taskUser.Supplier = element.SUPNAME;
          taskUser.taskInfo = element.DETAILS;
          taskUser.PartNumber = "";
          taskUser.user = new User();
          taskUser.user.id = EOrderUser.unAssigned;
          taskUser.taskType = new TaskType();
          taskUser.taskType.id = TaskTypesEnum.Good_received;
          taskUser.taskStatus = new TaskStatus();
          taskUser.taskStatus.id = TaskStatusEnum.New;
          taskUser.company = new Company();
          taskUser.company.id = companyId;

          const foundOne = await this.taskUsersRepository.findOne({
            where: { orderName: taskUser.orderName },
          });

          if (foundOne === null) {
            LinesInserted += 1;

            const newPo = await this.taskUsersRepository.save(taskUser);
            element.PORDERITEMS_SUBFORM.forEach(async (subForm) => {
              const ins = new TaskGrv();
              ins.taskUser = new TaskUser();
              ins.taskUser.id = EOrderUser.unAssigned;
              ins.PartNumber = subForm.BARCODE;
              ins.DataInfo = '';
              ins.productName = subForm.PARTNAME;
              ins.productDescription = subForm.PDES;
              ins.quantityRequired = Number(subForm.TQUANT);
              ins.taskUser = new TaskUser();
              ins.taskUser.id = newPo.id;
              await this.taskGrvRepository.save(ins);
            });
          }
        }
      });
      this._DbLogService.create({
        subject: "priority Po",
        message: "end import Po inserted lines: " + LinesInserted.toString(),
        level: "Info",
        context: "",
        metadata: "",
        companyId: companyId,
      });
      this.isLocked = false;
    } catch (error) {
      this.isLocked = false;
      this._DbLogService.create({
        subject: "priority Po",
        message: error.message,
        level: "error",
        context: "getAllNewPoFromPriority",
        metadata: "",
        companyId: companyId,
      });
    }
  }

  async findAll(companyId: string) {
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
      order: { taskPriority: "DESC", updatedAt: "ASC" },
    });
    const result = res.map((task) => {
      const { user, taskStatus, taskType, ...rest } = task;
      return {
        ...rest,
        userName: user ? `${user.userName}` : "Unassigned",
        taskType: taskType ? `${taskType.role}` : "Unassigned",
        taskStatus: taskStatus ? `${taskStatus.status}` : "Unassigned",
      };
    });
    return result;
  }

  async findOne(id: string) {
    const res = await this.taskUsersRepository.findOne({
      where: {
        id: id,
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
      userName: user ? `${user.userName}` : "Unassigned",
      taskType: taskType ? `${taskType.role}` : "Unassigned",
      taskStatus: taskStatus ? `${taskStatus.status}` : "Unassigned",
    };
  }

  async findTasksOpenByOrder(orderId: string) {
    return await this.taskUsersRepository.findOne({
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
    let taskUser = new TaskUser();
    taskUser = createTaskUserDto;
    taskUser.user = new User();
    taskUser.user.id = createTaskUserDto.userId;
    taskUser.taskType = new TaskType();
    taskUser.taskType.id = createTaskUserDto.taskTypeId;
    taskUser.taskStatus = new TaskStatus();
    taskUser.taskStatus.id = createTaskUserDto.taskStatusId;
    taskUser.company = new Company();
    taskUser.company.id = createTaskUserDto.companyId;
    taskUser.productName = createTaskUserDto.productName;
    taskUser.productDescription = createTaskUserDto.productDescription;

    return await this.taskUsersRepository.save(taskUser);
  }

  async update(id: string, updateTaskUserDto: UpdateTaskUserDto) {
    const { companyId, userId, taskStatusId, ...rest } = updateTaskUserDto;
    const data = {
      ...rest,
      ...(taskStatusId && { taskStatus: { id: taskStatusId } }),
      ...(userId && { user: { id: userId } }),
    };
    const res = await this.taskUsersRepository.update(id, data);
    await this.updateorderStatus(id);
    return res;
  }
  async updateTaskAssignedOrder(id: string) {
    const setOrderstatusOrderStatusEnum = {
      taskStatus: { id: OrderStatusEnum.AssistantPending }, // return status to in progress
    };
    await this._orderService.updateData(id, setOrderstatusOrderStatusEnum);
    return true;
  }
  async updateorderStatus(id: string) {
    //const taskUser = await this.TaskUserToDto(id, updateTaskUserDto);
    const taskUser = await this.taskUsersRepository.findOne({
      where: {
        id: id,
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
      taskStatus: { id: TaskStatusEnum.In_Progress }, // return status to in progress
    };
    await this._orderService.updateData(taskUser.orderid, setOrderstatus);
    return true;
  }

  async remove(id: string) {
    await this.updateorderStatus(id);
    return await this.taskUsersRepository.delete(id);
  }
}
