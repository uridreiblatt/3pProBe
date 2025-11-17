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
import { RootPoPriority } from "./dto/create-task-user.dto";
import { ConfigService } from "@nestjs/config";
import { EOrderUser } from "src/orders/order/enums/enum";
import { TaskGrv } from "../task-grv/entities/task-grv.entity";

@Injectable()
export class TaskUserService {
  private readonly _orderService: OrderService;
  private isLocked = false;
  private comapny = "cb3007"; // add call from database settings;
  private urlEndPoint = `/PORDERS?$filter=STATDES eq  'Sent' &$select=SUPNAME,CDES,ORDNAME,DETAILS`;
  private readonly logger = new Logger(TaskUserService.name);
  private readonly username: string;
  private readonly pwd: string;
  private readonly _DbLogService: DbLogService;
  constructor(
    @InjectRepository(TaskUser)
    private taskUsersRepository: Repository<TaskUser>,
    @InjectRepository(TaskGrv)
    private taskGrvRepository: Repository<TaskGrv>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private DbLogService: DbLogService,
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this._orderService = orderService;
    this._DbLogService = DbLogService;
    this.username = this.configService.get<string>("PRIORITY_USER");
    this.pwd = this.configService.get<string>("PRIORITY_PWD");
  }

  async getAllNewPoFromPriority(): Promise<any> {
    if (this.isLocked) {
      return "is locked";
    }

    this.isLocked = true;
    const url =
      `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      this.comapny +
      this.urlEndPoint;
    const credentials = btoa(this.username + ":" + this.pwd);
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
    const RmaInfo: RootPoPriority = data;
    this._DbLogService.create({
      subject: "priority Po",
      message: "start import Po: " + RmaInfo.value.length.toString(),
      level: "",
      context: "",
      metadata: "",
      companyId: 0,
    });
    let LinesInserted = 0;

    RmaInfo.value.forEach(async (element) => {
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
        taskUser.company.id = "1";

        const foundOne = await this.taskUsersRepository.findOne({
          where: { orderName: taskUser.orderName },
        });

        if (foundOne === null) {
          LinesInserted += 1;
          console.log(foundOne);
          const newPo = await this.taskUsersRepository.save(taskUser);
          element.PORDERITEMS.forEach(async (subForm) => {
            const ins = new TaskGrv();
            ins.taskUser = new TaskUser();
            ins.taskUser.id = EOrderUser.unAssigned;
            ins.PartNumber= subForm.PARTNAME;
            ins.DataInfo= subForm.CDES;
            ins.Location= subForm.PDES;
            ins.Total = Number(subForm.TQUANT);
            ins.taskUser =  new TaskUser();
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
      companyId: 0,
    });
    this.isLocked = false;
  }

  async findAll(companyId: string) {
    return await this.taskUsersRepository.find({
      where: {
        user: { userCompany: { company: { id: companyId } } },
        taskStatus: { id: Not(5) },
      },
      relations: {
        taskStatus: true,
        taskType: true,
        user: { userCompany: true },
      },
      order: { taskPriority: "DESC", updatedAt: "ASC" },
    });
  }

  async findOne(id: string) {
    console.log(id);
    return await this.taskUsersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        taskStatus: true,
        user: { userCompany: true },
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
