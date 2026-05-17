import { Injectable, Logger } from '@nestjs/common';
import { PriorityProducts } from './entities/priorityProducts.entity';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { PriorityProductsHierarchy } from '../priorityProductsHierarchy/entities/priority-products-hierarchy.entity';
import { CompanyService } from 'src/usersCompanies/company/company.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductStatusService } from '../product-status/product-status.service';

@Injectable()
export class priorityProductsService {
  private isLocked = false;
  private readonly logger = new Logger(priorityProductsService.name);
  // private readonly username: string;
  // private readonly pwd: string;
  // private readonly comapny: string;
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
    private productStatusService: ProductStatusService,
  ) {
    // this.username = this.configService.get<string>('PRIORITY_USER');
    // this.pwd = this.configService.get<string>('PRIORITY_PWD');
    // this.comapny = this.configService.get<string>('COMPANY') || '';
    this._CompanyService = CompanyService;
    this._ProductStatusService = productStatusService;
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

          await this.SyncPriorityParts(company.id, false); // ⬅️ waits before moving on
          await this._ProductStatusService.create(company.id);

          this.logger.log(`Finished company ${company.name}`);
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

  // @Cron(CronExpression.EVERY_WEEKEND)
  // async handleCronWeekly() {
  //   this.logger.log("crone Called EVERY_WEEKEND getAllNewPoFromPriority");
  //   const companies = await this._CompanyService.findAll();
  //   companies.map(async (e) => {
  //     await this.SyncPriorityParts(e.id, true);
  //   });
  // }

  async getPriorityParts(companyId: string) {
    return await this.SyncPriorityParts(companyId, true);
  }
  async SyncPriorityParts(companyId: string, fullSync: boolean): Promise<any> {
    if (this.isLocked) {
      return 'is locked';
    }

    this.isLocked = true;

    try {
      const resCompantSettings = await this._CompanyService.findOne(companyId);

      const base =
        resCompantSettings.companySetting.priorityApiUrl +
        resCompantSettings.companySetting.priorityApiCompany;

      const select =
        '$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES,PART';
      const expand = '$expand=PARTARC_SUBFORM($select=SONNAME,TYPE,SON)';

      const now = new Date();
      const startOfDayUTC = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - 7,
          0,
          0,
          0,
        ),
      );

      const isoDate = startOfDayUTC.toISOString().split('.')[0] + 'Z';
      const filter = `UDATE gt ${isoDate}`;

      const path = fullSync
        ? `/LOGPART?${select}&${expand}`
        : `/LOGPART?$filter=${encodeURIComponent(filter)}&${select}&${expand}`;

      const urlEndPointPriority = base + path;
      //console.log("part url", urlEndPointPriority);

      //const credentials = btoa(this.username + ':' + this.pwd);
      const credentials = btoa(
        resCompantSettings.companySetting.priorityApiUser +
          ':' +
          resCompantSettings.companySetting.priorityApiPassword,
      );
      const basicAuth = 'Basic ' + credentials;

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
              throw new Error(
                `An error happened. Msg: ${JSON.stringify(error.request)}`,
              );
            }),
          ),
      );

      const orderInfo: any = data;

      //console.log(
      //  "priority parts ",
      //  "start import parts " + orderInfo.value.length.toString()
      //);

      for (const element of orderInfo.value) {
        try {
          await this.PartRepository.upsert(
            {
              PARTNAME: element.PARTNAME,
              BARCODE: element.BARCODE || '',
              PARTDES: element.PARTDES,
              STATDES: element.STATDES,
              PART: element.PART,
              TYPE: element.TYPE,
              company: { id: companyId },
            },
            {
              conflictPaths: ['PART', 'company'],
              skipUpdateIfNoValuesChanged: true,
            },
          );

          if (Array.isArray(element.PARTARC_SUBFORM)) {
            for (const son of element.PARTARC_SUBFORM) {
              await this.PartHierarchyRepository.upsert(
                {
                  PART: element.PART,
                  SON: son.SON,
                  companyId: companyId,
                },
                {
                  conflictPaths: ['PART', 'SON', 'companyId'],
                  skipUpdateIfNoValuesChanged: true,
                },
              );
            }
          }
        } catch (error) {
          console.log('Failed importing part', element.PART, error);
        }
      }

      return true;
    } finally {
      this.isLocked = false;
    }
  }

  async findAll(companyId: string) {
    const sql = `SELECT productstatus FROM product_status where companyId ='${companyId}' and is_active = 0`;
    const newProductStatus = await this.PartRepository.query(sql);
    const newProductStatusArray: string[] = newProductStatus.map(
      (row: any) => row.productstatus,
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

      order: { PART: 'ASC' },
    });
    return res;
  }

  async findOne(id: string, companyId: string) {
    return this.PartRepository.createQueryBuilder('part')
      .leftJoinAndSelect('part.PriorityProductsLocation', 'location')
      .leftJoinAndSelect(
        'part.PriorityProductsHierarchy',
        'hierarchy',
        'hierarchy.companyId = :companyId',
        { companyId },
      )
      .leftJoinAndMapOne(
        'hierarchy.sonPriorityProduct',
        PriorityProducts,
        'sonPriorityProduct',
        `
      sonPriorityProduct.part = hierarchy.son
      AND sonPriorityProduct.companyId = hierarchy.companyId
    `,
      )
      .where('part.id = :id', { id })
      .getOne();
  }

  async findBarcode(barcode: string, companyId: string) {
    return await this.PartRepository.findOne({
      // select: {
      //   PARTNAME: true,
      // },
      where: [
        {
          BARCODE: barcode,
          company: { id: companyId },
        },
        {
          PARTNAME: barcode,
          company: { id: companyId },
        },
      ],
    });
  }

  async findChildByParentPart(id: string, companyId: string) {
    const sqlQuery = `
  SELECT PP.PARTNAME, PP.BARCODE, PL.location, PL.stockDate, PL.quantity, Z.zoneName
  FROM priorityProducts AS P
  LEFT JOIN priorityProductsHierarchy AS C ON P.PART = C.PART and P.companyId =  C.companyId
  LEFT JOIN priorityProducts AS PP ON PP.PART = C.SON and P.companyId =  PP.companyId
  LEFT JOIN priorityProductsLocation AS PL ON PL.priorityProductsId = PP.id
  LEFT JOIN zone AS Z ON Z.id = PL.zoneId
  WHERE P.PARTNAME = ? AND p.companyId = ? 
  ORDER BY Z.priority DESC, stockDate
`;

    const res = await this.PartRepository.query(sqlQuery, [id, companyId]);
    if (res.length === 0) {
      return [];
    }
    return res;
  }
}
