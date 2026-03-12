import { Injectable, Logger } from "@nestjs/common";
import { PriorityProducts } from "./entities/priorityProducts.entity";
import { In, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { PriorityProductsHierarchy } from "../priorityProductsHierarchy/entities/priority-products-hierarchy.entity";
import { CompanyService } from "src/usersCompanies/company/company.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ProductStatusService } from "../product-status/product-status.service";

@Injectable()
export class priorityProductsService {
  private isLocked = false;
  private readonly logger = new Logger(priorityProductsService.name);
  private readonly username: string;
  private readonly pwd: string;
  private readonly comapny: string;
  private readonly _CompanyService: CompanyService;
  private readonly _ProductStatusService: ProductStatusService;

  constructor(
    @InjectRepository(PriorityProducts)
    private PartRepository: Repository<PriorityProducts>,
    @InjectRepository(PriorityProductsHierarchy)
    private PartHierarchyRepository: Repository<PriorityProductsHierarchy>,
    private CompanyService: CompanyService,
    private configService: ConfigService,
    private httpService: HttpService,
    private productStatusService: ProductStatusService
  ) {
    this.username = this.configService.get<string>("PRIORITY_USER");
    this.pwd = this.configService.get<string>("PRIORITY_PWD");
    this.comapny = this.configService.get<string>("COMPANY") || "";
    this._CompanyService = CompanyService;
    this._ProductStatusService = productStatusService;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleCron() {
    this.logger.log("crone Called EVERY_DAY_AT_10AM getAllNewPoFromPriority");
    const companies = await this._CompanyService.findAll();
    companies.map(async (e) => {
      try {
        await this.SyncPriorityParts(e.id, false);
        await this._ProductStatusService.create(e.id);
      } catch (error) {
        console.log("SyncPriorityParts", error);
      }
    });
  }
  @Cron(CronExpression.EVERY_WEEKEND)
  async handleCronWeekly() {
    this.logger.log("crone Called EVERY_WEEKEND getAllNewPoFromPriority");
    const companies = await this._CompanyService.findAll();
    companies.map(async (e) => {
      await this.SyncPriorityParts(e.id, true);
    });
  }

  async getPriorityParts(companyId: string) {
    return await this.SyncPriorityParts(companyId, false);
  }
  async SyncPriorityParts(companyId: string, fullSync: boolean): Promise<any> {
    //https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/LOGPART?$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES
    if (this.isLocked) {
      return "is locked";
    }

    this.isLocked = true;
    const resCompantSettings = await this._CompanyService.findOne(companyId);
    const base =
      resCompantSettings.companySetting.priorityApiUrl +
      resCompantSettings.companySetting.priorityApiCompany;

    const select =
      "$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES,PART";
    const expand = "$expand=PARTARC_SUBFORM($select=SONNAME,TYPE,SON)";
    const now = new Date();
    const startOfDayUTC = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(), // -1, //last month
        now.getUTCDate() - 7, // last week
        0,
        0,
        0
      )
    );
    const isoDate = startOfDayUTC.toISOString().split(".")[0] + "Z";
    const filter = `UDATE  gt ${isoDate}`;
    const path = fullSync
      ? `/LOGPART?${select}&${expand}`
      : `/LOGPART?$filter=${encodeURIComponent(filter)}&${select}&${expand}`;

    const urlEndPointPriority = base + path;
    console.log("part url", urlEndPointPriority);

    const credentials = btoa(this.username + ":" + this.pwd);
    const basicAuth = "Basic " + credentials;
    const data = await lastValueFrom(
      this.httpService
        .get(urlEndPointPriority, {
          headers: {
            Authorization: basicAuth,
          },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((error) => {
            this.isLocked = false;
            throw `An error happened. Msg: ${JSON.stringify(error.request)}`;
          })
        )
    );
    const orderInfo: any = data;
    //this._DbLogService.create({
    console.log(
      "priority parts ",
      "start import parts " + orderInfo.value.length.toString()
    );
    let LinesInserted = 0;

    orderInfo.value.forEach(async (element) => {
      const createPartDto = new PriorityProducts();
      createPartDto.PARTNAME = element.PARTNAME;
      createPartDto.BARCODE = element.BARCODE || "";
      createPartDto.PARTDES = element.PARTDES;
      createPartDto.STATDES = element.STATDES;

      createPartDto.PART = element.PART;
      createPartDto.TYPE = element.TYPE;
      createPartDto.company = new Company();
      createPartDto.company.id = companyId;
      try {
        //await this.PartRepository.save(createPartDto);

        await this.PartRepository.upsert(
          {
            PARTNAME: element.PARTNAME,
            BARCODE: element.BARCODE || "",
            PARTDES: element.PARTDES,
            STATDES: element.STATDES,
            PART: element.PART,
            TYPE: element.TYPE,
            company: { id: companyId },
          },
          {
            conflictPaths: ["PART"], // unique field
            skipUpdateIfNoValuesChanged: true,
          }
        );
        element.PARTARC_SUBFORM.map(async (son) => {
          const prod = new PriorityProductsHierarchy();
          (prod.PART = element.PART),
            (prod.SON = son.SON),
            await this.PartHierarchyRepository.save(prod);
        });
      } catch (error) {
        console.log(error);
      }
    });

    // await this._DbLogService.create({
    //   subject: 'priority orders',
    //   message: 'end import orders orders: ' + LinesInserted.toString(),
    //   level: '',
    //   context: '',
    //   metadata: '',
    //   companyId: 0
    // });
    this.isLocked = false;
    return true;
  }

  async findAll(companyId: string) {
    const sql = `SELECT productstatus FROM p3pro.product_status where companyId ='${companyId}' and is_active = 0`;
    console.log(sql);
    const newProductStatus = await this.PartRepository.query(sql);
    const newProductStatusArray: string[] = newProductStatus.map(
      (row: any) => row.productstatus
    );
    console.log(newProductStatusArray);
    const res = await this.PartRepository.find({
      where: {
        STATDES: Not(In(newProductStatusArray)),
        company: { id: companyId },
      },
      //take:20,

      relations: {
        PriorityProductsHierarchy: true,
        PriorityProductsLocation: { zone: true },
      },

      order: { PART: "ASC" },
    });
    return res;
  }

  async findOne(id: string) {
    return await this.PartRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        PriorityProductsLocation: { zone: true },
        PriorityProductsHierarchy: { sonPriorityProduct: true },
      },
    });
  }

  async findBarcode(barcode: string) {
    return await this.PartRepository.findOne({
      // select: {
      //   PARTNAME: true,
      // },
      where: {
        BARCODE: barcode,
      },
      relations: {
        PriorityProductsHierarchy: true,
        PriorityProductsLocation: { zone: true },
      },
    });
  }

  async findChildByParentPart(id: string) {
    const sqlQuery =
      `SELECT     PP.PARTNAME, PP.BARCODE,   PL.location,    PL.stockDate,    PL.quantity,    Z.zoneName ` +
      ` FROM priorityProducts AS P LEFT JOIN priorityProductsHierarchy AS C    ON P.PART = C.PART LEFT JOIN priorityProducts AS PP    ON PP.PART = C.SON LEFT JOIN priorityProductsLocation AS PL     ON PL.priorityProductsId = PP.id LEFT JOIN zone AS Z    ON Z.id = PL.zoneId ` +
      ` WHERE P.PARTNAME = '` +
      id +
      `'` +
      ` ORDER BY Z.priority desc , stockDate`;
    //console.log(sqlQuery);
    const res = await this.PartRepository.query(sqlQuery);
    return res;
  }

  // async findChildByParent(id: string) {
  //   //   let sqlQuery =
  //   SELECT    P.PART,    C.SON,    DT.PARTNAME,    DT.PARTDES,    DT.BARCODE FROM priorityProducts P
  // LEFT JOIN priorityProductsHierarchy C   ON P.PART = C.PART LEFT JOIN priorityProducts DT    ON DT.PART = C.SON
  // WHERE P.PARTNAME = 'TCDP04W1910GASW';
  //   sqlQuery += " where   P.[id] = '" + id + "'";
  //   //} else {
  //   //  sqlQuery += " AND  P.[PARTNAME] = '" + id + "'";
  //   //}

  //   const res = await this.PartRepository.query(sqlQuery);
  //   return res;
  // }

  // async update(id: number, updatePartDto: UpdatePartDto) {
  //   return await this.PartRepository.update(id, updatePartDto);
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} part`;
  // }
}
