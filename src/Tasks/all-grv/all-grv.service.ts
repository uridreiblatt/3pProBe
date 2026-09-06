import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAllGrvDto, RootPoPriority } from './dto/create-all-grv.dto';
import { UpdateAllGrvDto } from './dto/update-all-grv.dto';
import { AllGrv } from './entities/all-grv.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/orders/order/order.service';
import { Not, Repository } from 'typeorm';
import { TaskGrv } from '../task-grv/entities/task-grv.entity';
import { TaskUser } from '../task-user/entities/task-user.entity';
import { DbLogService } from 'src/db-log/db-log.service';
import { CompanyService } from 'src/usersCompanies/company/company.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { catchError, lastValueFrom, map } from 'rxjs';
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
import { EOrderUser, OrderStatusEnum } from 'src/orders/order/enums/enum';

@Injectable()
export class AllGrvService {
  private readonly logger = new Logger(AllGrvService.name);
  private isLocked = false;
  private readonly _DbLogService: DbLogService;
  private readonly _CompanyService: CompanyService;

  constructor(
    @InjectRepository(AllGrv)
    private AllGrvRepository: Repository<AllGrv>,
    @InjectRepository(TaskGrv)
    private taskGrvRepository: Repository<TaskGrv>,
    private DbLogService: DbLogService,
    private configService: ConfigService,
    private httpService: HttpService,
    private CompanyService: CompanyService,
  ) {
    this._DbLogService = DbLogService;
    this._CompanyService = CompanyService;
  }

  private isRunning = false;

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    if (this.isRunning) {
      this.logger.warn(
        'Cron skipped - SyncAllNewPoFromPriority -previous run still in progress',
      );
      return;
    }

    this.isRunning = true;
    //this.logger.log('cron Called SyncAllNewPoFromPriority EVERY_30_MINUTES');

    try {
      const allCompanies = await this._CompanyService.findAll();

      for (const company of allCompanies) {
        if (!company.companySetting) continue;
        if (!company.isActive) continue;

        try {
          await this.SyncAllNewPoFromPriority(company.id);

          // this.logger.log(`Finished company ${company.name}`);
        } catch (err) {
          this.logger.error(`Error processing company ${company.name}`, err);
          // continues to next company
        }
      }
    } catch (error) {
      this.logger.error('Error in handleCron rma', error);
    } finally {
      this.isRunning = false;
    }
  }

  async getAllNewPoFromPriority(companyId: string): Promise<any> {
    return await this.SyncAllNewPoFromPriority(companyId);
  }

  async SyncAllNewPoFromPriority(companyId: string): Promise<any> {
    //console.log(this.isLocked);
    if (this.isLocked) {
      return 'is locked';
    }

    try {
      this.isLocked = true;
      const resCompantSettings = await this._CompanyService.findOne(companyId);

      //const urlEndPoint = `/PORDERS?$filter=STATDES eq  'Sent' &$select=SUPNAME,CDES,ORDNAME,DETAILS&$expand=PORDERITEMS_SUBFORM($select=PARTNAME,PDES,TQUANT)`;
      const urlEndPointPriority = `/PORDERS?$filter=STATDES eq  '${resCompantSettings.companySetting.priorityPoStatus}' &$select=SUPNAME,CDES,ORDNAME,DETAILS,CURDATE&$expand=PORDERITEMS_SUBFORM($select=PARTNAME,PDES,TQUANT,BARCODE)`;
      const url =
        //`https://win01.maclocks.com/odata/Priority/tabula.ini/` +
        resCompantSettings.companySetting.priorityApiUrl +
        resCompantSettings.companySetting.priorityApiCompany +
        urlEndPointPriority;
      // const url =
      //   `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      //   this.company +
      //   this.urlEndPoint;
      //const credentials = btoa(this.username + ":" + this.pwd);

      const credentials = btoa(
        resCompantSettings.companySetting.priorityApiUser +
          ':' +
          resCompantSettings.companySetting.priorityApiPassword,
      );
      const basicAuth = 'Basic ' + credentials;
      //console.log(url)

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
                `An error happened. Msg: ${JSON.stringify(error.request)}`,
              );
              throw `An error happened. Msg: ${JSON.stringify(error.request)}`;
            }),
          ),
      );
      const GrvInfo: RootPoPriority = data;

      let LinesInserted = 0;

      GrvInfo.value.forEach(async (element) => {
        if (element !== null) {
          let allGrv = new AllGrv();
          allGrv.PO = element.ORDNAME;
          allGrv.CURDATE = element.CURDATE;
          allGrv.DataInfo = element.CDES;
          allGrv.Supplier = element.SUPNAME;
          allGrv.taskInfo = element.DETAILS;
          allGrv.PartNumber = '';
          allGrv.user = new User();
          allGrv.user.id = EOrderUser.unAssigned;
          allGrv.taskType = new TaskType();
          allGrv.taskType.id = TaskTypesEnum.Good_received;
          allGrv.taskStatus = new TaskStatus();
          allGrv.taskStatus.id = TaskStatusEnum.New;
          allGrv.company = new Company();
          allGrv.company.id = companyId;

          const foundOne = await this.AllGrvRepository.findOne({
            where: {
              PO: element.ORDNAME,
              company: { id: companyId },
            },
          });

          if (foundOne === null) {
            LinesInserted += 1;

            const newPo = await this.AllGrvRepository.save(allGrv);
            element.PORDERITEMS_SUBFORM.forEach(async (subForm) => {
              const ins = new TaskGrv();
              ins.allGrv = new AllGrv();
              ins.allGrv.id = EOrderUser.unAssigned;
              ins.allGrv.id = newPo.id;
              ins.PartNumber = subForm.BARCODE || subForm.PARTNAME;
              ins.DataInfo = '';
              ins.productName = subForm.PARTNAME;
              ins.productDescription = subForm.PDES;
              ins.quantityRequired = Number(subForm.TQUANT);

              await this.taskGrvRepository.save(ins);
            });
          }
        }
      });

      this.isLocked = false;
    } catch (error: any) {
      this.isLocked = false;
      this._DbLogService.create({
        subject: 'priority Po',
        message: error.message,
        level: 'error',
        context: 'getAllNewPoFromPriority',
        metadata: '',
        companyId: companyId,
      });
    }
  }

  // create(createAllGrvDto: CreateAllGrvDto) {
  //   return 'This action adds a new allGrv';
  // }

  async findAll(companyId: string) {
    const res = await this.AllGrvRepository.find({
      where: {
        company: { id: companyId },
        taskStatus: { id: Not(TaskStatusEnum.Complete) },
      },
      relations: {
        taskStatus: true,
        taskType: true,
        user: true,
      },
      order: { taskPriority: 'DESC', CURDATE: 'ASC' },
    });
    const result = res.map((task) => {
      const { user, taskStatus, taskType, ...rest } = task;
      return {
        id: rest.id,
        CURDATE: rest.CURDATE,
        DataInfo: rest.DataInfo,
        PO: rest.PO,
        taskPriority: rest.taskPriority,
        taskInfo: rest.taskInfo,
        userName: user ? `${user.userName}` : 'Unassigned',
        taskType: taskType ? `${taskType.role}` : 'Good received',
        taskStatus: taskStatus ? `${taskStatus.status}` : 'New',
      };
    });
    return result;
  }

  async findOne(id: string) {
    const res = await this.AllGrvRepository.findOne({
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
      userName: user ? `${user.userName}` : 'Unassigned',
      taskType: taskType ? `${taskType.role}` : 'Unassigned',
      taskStatus: taskStatus ? `${taskStatus.status}` : 'Unassigned',
    };
  }

  async update(
    id: string,
    updateAllGrvDto: UpdateAllGrvDto,
    companyId: string,
  ) {
    const { userId, taskStatusId, taskGrv, ...rest } = updateAllGrvDto;
    const data = {
      ...rest,
      ...(taskStatusId && { taskStatus: { id: taskStatusId } }),
      ...(userId && { user: { id: userId } }),
    };
    if (Array.isArray(taskGrv)) {
      await Promise.all(
        taskGrv.map((tskGrv) =>
          this.taskGrvRepository.update(tskGrv.id, {
            Total: tskGrv.Total,
          }),
        ),
      );
    }

    const res = await this.AllGrvRepository.update(id, data);
    return res;
  }

  async remove(id: string) {
    await this.taskGrvRepository.delete({
      allGrv: { id: id },
    });
    return await this.AllGrvRepository.delete(id);
  }
}
