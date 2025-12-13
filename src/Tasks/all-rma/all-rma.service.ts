import { Injectable, Logger } from "@nestjs/common";
import { CreateAllRmaDto, RootRmaPriority } from "./dto/create-all-rma.dto";
import { UpdateAllRmaDto } from "./dto/update-all-rma.dto";
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

@Injectable()
export class AllRmaService {
  private isLocked = false;
  private urlEndPoint = `/DOCUMENTS_m?$filter=STATDES eq 'Open' &$select=CUSTNAME,CUSTDES,CURDATE,DOCNO,DETAILS,FBCM_RETREASONCODE,FBCM_RETREASONDES,STATDES&$top=10`;
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

  async getAllNewRmaFromPriority(companyId: string): Promise<any> {
    if (this.isLocked) {
      return "is locked";
    }
    this.isLocked = true;
    const resCompantSettings = await this._CompanyService.findOne(companyId);
    const url =
      //`https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      resCompantSettings.companySetting.priorityApiUrl +
      resCompantSettings.companySetting.priorityApiCompany +
      this.urlEndPoint;
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
      companyId: companyId ,
    });
    let LinesInserted = 0;
    //console.log(url,"RmaInfo.value.length: " + RmaInfo.value.length, JSON.stringify(RmaInfo.value));


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
        rma.orderid = "";
        rma.orderlineId = "";
        rma.taskPriority = 10;
        rma.cylinder = "";
        rma.backToInventory = 1;
        rma.user = new User();
        rma.user.id = "aaa-bbb-ccc"; // unAssigned
        rma.taskStatus = new TaskStatus();
        rma.taskStatus.id = 1;
        rma.company = new Company();
        rma.company.id = companyId;
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
      companyId: companyId,
    });
    this.isLocked = false;
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
    return await this.allRmaRepository.find({
      where: { company: { id: companyId } },
    });
  }

  async findOne(id: string) {
    return await this.allRmaRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateAllRmaDto: any) {
    let allRma = new AllRma();
    allRma = updateAllRmaDto;
    allRma.user = new User();
    allRma.user.id = "1";
    allRma.taskStatus = new TaskStatus();
    allRma.taskStatus.id = updateAllRmaDto.taskStatusId;
    allRma.company = new Company();
    allRma.company.id = updateAllRmaDto.companyId;
    return await this.allRmaRepository.update(id, updateAllRmaDto);
  }

  async remove(id: string) {
    return await this.allRmaRepository.delete(id);
  }
}
