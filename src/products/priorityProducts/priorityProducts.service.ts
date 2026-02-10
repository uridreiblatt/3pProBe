import { Injectable, Logger } from "@nestjs/common";
import { PriorityProducts } from "./entities/priorityProducts.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { catchError, lastValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Company } from "src/usersCompanies/company/entities/company.entity";
import { PriorityProductsHierarchy } from "../priorityProductsHierarchy/entities/priority-products-hierarchy.entity";
import { CompanyService } from "src/usersCompanies/company/company.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class priorityProductsService {
  private isLocked = false;
  private readonly logger = new Logger(priorityProductsService.name);
  private readonly username: string;
  private readonly pwd: string;
  private readonly comapny: string;
  private readonly _CompanyService: CompanyService;

  constructor(
    @InjectRepository(PriorityProducts)
    private PartRepository: Repository<PriorityProducts>,
    @InjectRepository(PriorityProductsHierarchy)
    private PartHierarchyRepository: Repository<PriorityProductsHierarchy>,
    private CompanyService: CompanyService,
    private configService: ConfigService,
    private httpService: HttpService
  ) {
    this.username = this.configService.get<string>("PRIORITY_USER");
    this.pwd = this.configService.get<string>("PRIORITY_PWD");
    this.comapny = this.configService.get<string>("COMPANY") || "";
    this._CompanyService = CompanyService;
  }

    @Cron(CronExpression.EVERY_DAY_AT_10AM)
      async handleCron() {
        this.logger.log('crone Called EVERY_DAY_AT_10AM getAllNewPoFromPriority');
        return;
        const companies = await this._CompanyService.findAll();
        companies.map(async (e)=>{
           await this.SyncPriorityParts(e.id);
  
        })
      }


  async getPriorityParts(companyId: string){
    return await this.SyncPriorityParts(companyId);
  }
  async SyncPriorityParts(companyId: string) {
    //https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/LOGPART?$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES
    if (this.isLocked) {
      return "is locked";
    }

    this.isLocked = true;
    const resCompantSettings = await this._CompanyService.findOne(companyId)
    const url =
      //   `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
      //   this.comapny +
      resCompantSettings.companySetting.priorityApiUrl +
      resCompantSettings.companySetting.priorityApiCompany +
      `/LOGPART?$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES,PART&$expand=PARTARC_SUBFORM($select=SONNAME,TYPE,SON)`;
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
            throw `An error happened. Msg: ${JSON.stringify(error.request)}`;
          })
        )
    );
    const orderInfo: any = data;
    //this._DbLogService.create({
    console.log(      "priority parts ",      "start import parts " + orderInfo.value.length.toString()    );
    let LinesInserted = 0;

    orderInfo.value.forEach(async (element) => {
      const createPartDto = new PriorityProducts();
      createPartDto.PARTNAME = element.PARTNAME;
      createPartDto.BARCODE = element.BARCODE || "";
      createPartDto.PARTDES = element.PARTDES;
      createPartDto.PART = element.PART;
      createPartDto.TYPE = element.TYPE;
      createPartDto.company = new Company();
      createPartDto.company.id = "aaa-aaa-aaa";
      try {
        await this.PartRepository.save(createPartDto);
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
    // return await this.PartRepository.find({
    //   // take: 100,
    // });
    // const sqlQuery =
    //   'SELECT  pp.[id] ,pp.[PARTNAME]  ,pp.[PART] ,pp.[PARTDES] ,pp.[BARCODE],pp.[TYPE] ,pl.[location] , z.[zoneName],  cast(pl.[stockDate]as nvarchar) as stockDate,pl.[quantity]   ' +
    //   ' FROM [dbo].[priorityProducts] pp  ' +
    //   ' left JOIN  [dbo].[priorityProductsLocation] pl ON pp.[id]= pl.[priorityProductsId] ' +
    //   ' left JOIN [dbo].[zone] z ON pl.[zoneId] = z.id order by isnull(z.priority,100) ';
    // const res = await this.PartRepository.query(sqlQuery);
    const res = await this.PartRepository.find({
      where: {
        TYPE: "R",
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
` FROM priorityProducts AS P LEFT JOIN priorityProductsHierarchy AS C    ON P.PART = C.PART LEFT JOIN priorityProducts AS PP    ON PP.PART = C.SON LEFT JOIN priorityProductsLocation AS PL     ON PL.priorityProductsId = PP.id LEFT JOIN zone AS Z    ON Z.id = PL.zoneId `+
` WHERE P.PARTNAME = '`+id+ `'`  +
` ORDER BY PP.PARTNAME, Z.priority`;
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
