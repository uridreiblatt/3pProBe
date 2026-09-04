import { Injectable, Logger } from '@nestjs/common';
import { AllRma } from './entities/all-rma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map, catchError } from 'rxjs';
import { DbLogService } from 'src/db-log/db-log.service';
import { CompanyService } from 'src/usersCompanies/company/company.service';
import { RootRmaPriority } from './dto/create-all-rma.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskRma } from '../task-rma/entities/task-rma.entity';
import { title } from 'process';

@Injectable()
export class AllRmaService {
  private isLocked = false;
  private readonly logger = new Logger(AllRmaService.name);
  private readonly _CompanyService: CompanyService;
  private readonly _DbLogService: DbLogService;
  constructor(
    @InjectRepository(AllRma)
    private allRmaRepository: Repository<AllRma>,
    @InjectRepository(TaskRma)
    private TaskRmaRepository: Repository<TaskRma>,
    private httpService: HttpService,
    private configService: ConfigService,
    private DbLogService: DbLogService,
    private CompanyService: CompanyService,
  ) {
    this._DbLogService = DbLogService;
    this._CompanyService = CompanyService;
  }

  private isRunning = false;

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    if (this.isRunning) {
      this.logger.warn('Cron skipped - previous run still in progress');
      return;
    }

    this.isRunning = true;
    //this.logger.log('cron Called getAllNewRmaFromPriority EVERY_30_MINUTES');

    try {
      const allCompanies = await this._CompanyService.findAll();

      for (const company of allCompanies) {
        if (!company.companySetting) continue;
        if (!company.isActive) continue;

        try {
          this.logger.log(`Processing company ${company.name}`);

          await this.syncAllNewRmaFromPriority(company); // ⬅️ waits before moving on

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

  async getAllNewRmaFromPriority(companyId: string): Promise<any> {
    const company = await this._CompanyService.findOne(companyId);
    if (company.companySetting) await this.syncAllNewRmaFromPriority(company);
  }
  async syncAllNewRmaFromPriority(resCompantSettings: Company): Promise<any> {
    if (this.isLocked) {
      return 'is locked';
    }
    try {
      this.isLocked = true;
      const urlEndPointPriority = `/DOCUMENTS_m?$filter=STATDES eq '${resCompantSettings.companySetting.priorityRmaStatus}' &$top=100&$expand=INTERNALDIALOGTEXT_SUBFORM`;

      const url =
        //`https://win01.maclocks.com/odata/Priority/tabula.ini/` +
        resCompantSettings.companySetting.priorityApiUrl +
        resCompantSettings.companySetting.priorityApiCompany +
        urlEndPointPriority;

      const credentials = btoa(
        resCompantSettings.companySetting.priorityApiUser +
          ':' +
          resCompantSettings.companySetting.priorityApiPassword,
      );
      const basicAuth = 'Basic ' + credentials;
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

      const RmaInfo: RootRmaPriority = data;

      let LinesInserted = 0;

      RmaInfo.value.forEach(async (element) => {
        if (element !== null) {
          const rma: AllRma = new AllRma();
          rma.CUSTNAME = element.CUSTNAME || '';
          rma.CUSTDES = element.CUSTDES;
          rma.CURDATE = element.CURDATE;
          rma.DOCNO = element.DOCNO;
          rma.STATDES = element.STATDES;
          rma.DETAILS = element.DETAILS || '';
          rma.FBCM_RETREASONCODE = element.FBCM_RETREASONCODE || '';
          rma.FBCM_RETREASONDES = element.FBCM_RETREASONDES || '';
          rma.taskPriority = 10;
          rma.user = new User();
          rma.user.id = 'aaa-bbb-ccc'; // unAssigned
          rma.taskStatus = new TaskStatus();
          let tmpText = '';
          try {
            tmpText = element.INTERNALDIALOGTEXT_SUBFORM?.TEXT || '';
            if (tmpText) {
              const ind = tmpText.lastIndexOf('</style>');
              if (ind !== -1) {
                tmpText = tmpText.substring(ind + 8);
              }

              tmpText = tmpText
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            }
          } catch (error) {
            console.log(error);
          }
          rma.Title = tmpText || '';
          rma.trackingNumber = '';
          rma.remarks = '';
          rma.taskStatus.id = 1;
          rma.company = new Company();
          rma.company.id = resCompantSettings.id;
          const foundOne = await this.allRmaRepository.findOne({
            where: { DOCNO: rma.DOCNO },
          });

          if (foundOne === null) {
            LinesInserted += 1;
            await this.allRmaRepository.save(rma);
          }
        }
      });

      this.isLocked = false;
    } catch (error: any) {
      this.isLocked = false;
      console.log(error.message ?? '');
      this._DbLogService.create({
        subject: 'priority rmas error',
        message: error.message ?? '',
        level: '',
        context: '',
        metadata: '',
        companyId: resCompantSettings.id,
      });
    }
  }

  async create(createAllRmaDto: any) {
    let allRma = new AllRma();
    allRma = createAllRmaDto;
    // allRma.user =  new User();
    // allRma.user.id = createAllRmaDto.userId;
    allRma.taskStatus = new TaskStatus();
    allRma.taskStatus.id = createAllRmaDto.taskStatusId;
    allRma.company = new Company();
    allRma.company.id = createAllRmaDto.companyId;
    return await this.allRmaRepository.save(allRma);
  }

  async findAll(companyId: string) {
    const res = await this.allRmaRepository.find({
      where: {
        company: { id: companyId },
        taskStatus: { id: Not(3) },
      },
      relations: {
        user: true,
        taskStatus: true,
      },
    });

    const resAll = res.map((rma) => {
      return {
        id: rma.id,
        CURDATE: rma.CURDATE,
        CUSTDES: rma.CUSTDES,
        CUSTNAME: rma.CUSTNAME,
        DOCNO: rma.DOCNO,
        DETAILS: rma.DETAILS,
        FBCM_RETREASONCODE: rma.FBCM_RETREASONCODE,
        FBCM_RETREASONDES: rma.FBCM_RETREASONDES,
        taskPriority: rma.taskPriority,
        status: rma.taskStatus.status,
        userName: rma.user?.userName || 'UnAssigned',
      };
    });
    return resAll;
  }

  async findOne(id: string, companyId: string) {
    const res = await this.allRmaRepository.findOne({
      where: { id: id, company: { id: companyId } },
      relations: {
        user: true,
        taskStatus: true,
        taskRma: true,
      },
    });

    const resAll = {
      id: res.id,
      CURDATE: res.CURDATE,
      CUSTDES: res.CUSTDES,
      CUSTNAME: res.CUSTNAME,
      DOCNO: res.DOCNO,
      DETAILS: res.DETAILS,
      FBCM_RETREASONCODE: res.FBCM_RETREASONCODE,
      FBCM_RETREASONDES: res.FBCM_RETREASONDES,
      remarks: res.remarks,
      status: res.taskStatus.status,
      userName: res.user.userName,
      title: res.Title,
      taskRma: res.taskRma.map((rma) => {
        return {
          id: rma.id,
          PartNumber: rma.PartNumber,
          productStatus: rma.productStatus,
          partQount: rma.partQount,
          backToInventory: rma.backToInventory,
          cylinder: rma.cylinder,
          remarks: rma.remarks,
          productName: rma.productName,
        };
      }),
    };
    return resAll;
  }

  async update(id: string, updateAllRmaDto: any, companyId: string) {
    // let allRma = new AllRma();
    // allRma = updateAllRmaDto;
    // allRma.user = new User();
    // allRma.user.id = "1";
    // allRma.taskStatus = new TaskStatus();
    // allRma.taskStatus.id = updateAllRmaDto.taskStatusId;
    // allRma.company = new Company();
    // allRma.company.id = updateAllRmaDto.companyId;

    const { userId, taskStatusId, ...rest } = updateAllRmaDto;
    const data = {
      ...rest,
      ...(taskStatusId && { taskStatus: { id: taskStatusId } }),
      ...(userId && { user: { id: userId } }),
    };
    return await this.allRmaRepository.update(
      { id, company: { id: companyId } },
      data,
    );
  }

  async remove(id: string, companyId: string) {
    await this.TaskRmaRepository.delete({
      allRma: { id: id, company: { id: companyId } },
    });
    return await this.allRmaRepository.delete({
      id,
      company: { id: companyId },
    });
  }
}
