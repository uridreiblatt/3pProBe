import { Injectable, Logger } from "@nestjs/common";
import { AllRma } from "./entities/all-rma.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskStatus } from "src/settings/task-status/entities/task-status.entity";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom, map, catchError } from "rxjs";
import { DbLogService } from "src/db-log/db-log.service";
import { CompanyService } from "src/usersCompanies/company/company.service";
import { RootRmaPriority } from "./dto/create-all-rma.dto";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class AllRmaService {
  private isLocked = false;
  private readonly logger = new Logger(AllRmaService.name);
  private readonly _CompanyService: CompanyService;
  private readonly _DbLogService: DbLogService;
  constructor(
    @InjectRepository(AllRma)
    private allRmaRepository: Repository<AllRma>,
    private httpService: HttpService,
    private configService: ConfigService,
    private DbLogService: DbLogService,
    private CompanyService: CompanyService
  ) {
    this._DbLogService = DbLogService;
    this._CompanyService = CompanyService;
  }

  @Cron(CronExpression.EVERY_2ND_HOUR)
  async handleCron() {
    this.logger.log("crone Called getAllNewRmaFromPriority EVERY_2ND_HOUR");
    const allCompanies = await this._CompanyService.findAll();
    allCompanies.forEach(async (company) => {
      if (company.companySetting) await this.getAllNewRmaFromPriority(company);
    });
  }

  async getAllNewRmaFromPriority(resCompantSettings: Company): Promise<any> {
    if (this.isLocked) {
      return "is locked";
    }
    try {
      
    
    this.isLocked = true;
    //const resCompantSettings = await this._CompanyService.findOne(companyId);
    //const urlEndPoint = `/DOCUMENTS_m?$filter=STATDES eq 'Open' &$select=CUSTNAME,CUSTDES,CURDATE,DOCNO,DETAILS,FBCM_RETREASONCODE,FBCM_RETREASONDES,STATDES&$top=10`;
    const urlEndPoint = `/DOCUMENTS_m?$filter=STATDES eq '${resCompantSettings.companySetting.priorityRmaStatus}' &$select=CUSTNAME,CUSTDES,CURDATE,DOCNO,DETAILS,FBCM_RETREASONCODE,FBCM_RETREASONDES,STATDES&$top=10`;

    const url =
      //`https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      resCompantSettings.companySetting.priorityApiUrl +
      resCompantSettings.companySetting.priorityApiCompany +
      urlEndPoint;

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
    const RmaInfo: RootRmaPriority = data;

    this._DbLogService.create({
      subject: "priority rmas",
      message: "start import rmas " + RmaInfo.value.length.toString(),
      level: "",
      context: "",
      metadata: "",
      companyId: resCompantSettings.id,
    });
    let LinesInserted = 0;

    RmaInfo.value.forEach(async (element) => {
      if (element !== null) {
        const rma: AllRma = new AllRma();
        rma.CUSTNAME = element.CUSTNAME || "";
        rma.CUSTDES = element.CUSTDES;
        rma.CURDATE = element.CURDATE;
        rma.DOCNO = element.DOCNO;
        rma.STATDES = element.STATDES;
        rma.DETAILS = element.DETAILS || "";
        rma.FBCM_RETREASONCODE = element.FBCM_RETREASONCODE || "";
        rma.FBCM_RETREASONDES = element.FBCM_RETREASONDES || "";
        rma.taskPriority = 10;
        rma.user = new User();
        rma.user.id = "aaa-bbb-ccc"; // unAssigned
        rma.taskStatus = new TaskStatus();
        rma.Title = "";
        rma.trackingNumber = "";
        rma.remarks = "";
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
    this._DbLogService.create({
      subject: "priority rmas",
      message: "end import rma inserted lines: " + LinesInserted.toString(),
      level: "",
      context: "",
      metadata: "",
      companyId: resCompantSettings.id,
    });
    this.isLocked = false;
    } catch (error) {
      this.isLocked = false;
      console.log(error.message)     
      this._DbLogService.create({
      subject: "priority rmas error",
      message:  error.message,
      level: "",
      context: "",
      metadata: "",
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
      where: { company: { id: companyId } },
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
        userName: rma.user?.userName || "UnAssigned",
      };
    });
    return resAll;
  }

  async findOne(id: string) {
    const res = await this.allRmaRepository.findOne({
      where: { id: id },
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

      status: res.taskStatus.status,
      userName: res.user.userName,
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

  async update(id: string, updateAllRmaDto: any) {
    // let allRma = new AllRma();
    // allRma = updateAllRmaDto;
    // allRma.user = new User();
    // allRma.user.id = "1";
    // allRma.taskStatus = new TaskStatus();
    // allRma.taskStatus.id = updateAllRmaDto.taskStatusId;
    // allRma.company = new Company();
    // allRma.company.id = updateAllRmaDto.companyId;

    const { companyId, userId, taskStatusId, ...rest } = updateAllRmaDto;
    const data = {
      ...rest,
      ...(taskStatusId && { taskStatus: { id: taskStatusId } }),
      ...(userId && { user: { id: userId } }),
    };
    return await this.allRmaRepository.update(id, data);
  }

  async remove(id: string) {
    return await this.allRmaRepository.delete(id);
  }
}
