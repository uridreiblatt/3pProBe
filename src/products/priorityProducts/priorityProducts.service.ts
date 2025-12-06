import { Injectable, Logger } from '@nestjs/common';
import { PriorityProducts } from './entities/priorityProducts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

@Injectable()
export class priorityProductsService {
  private isLocked = false;
  private readonly logger = new Logger(priorityProductsService.name);
    private readonly username: string;
    private readonly pwd: string;
    private readonly comapny: string;
 
  constructor(
    @InjectRepository(PriorityProducts)
    private PartRepository: Repository<PriorityProducts>,
     private configService: ConfigService,
     private httpService: HttpService,
  ) {
    this.username = this.configService.get<string>('PRIORITY_USER');
    this.pwd = this.configService.get<string>('PRIORITY_PWD');
    this.comapny = this.configService.get<string>('COMPANY') || '';
  }



  async getPriorityParts(){
    //https://win01.maclocks.com/odata/Priority/tabula.ini/cb3007/LOGPART?$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES 
        if (this.isLocked) {
          return 'is locked';
        }
    
        this.isLocked = true;
        const url =
          `https://win01.maclocks.com/odata/Priority/tabula.ini/` +
          this.comapny +
          `/LOGPART?$select=PARTNAME,BARCODE,PARTDES,TYPE,FAMILYNAME,STATDES,PART`;
        const credentials = btoa(this.username + ':' + this.pwd);
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
                throw `An error happened. Msg: ${JSON.stringify(error.request)}`;
              }),
            ),
        );
        const orderInfo: any = data;
        //this._DbLogService.create({
        console.log(
          'priority parts ',
           'start import parts ' + orderInfo.value.length.toString(),
        );
        let LinesInserted = 0;
    
        orderInfo.value.forEach(async (element) => {
          
            const createPartDto  = new PriorityProducts();
            createPartDto.PARTNAME = element.PARTNAME;
            createPartDto.BARCODE = element.BARCODE || '';
             createPartDto.PARTDES = element.STATDES;
            createPartDto.PART = element.PART;                       
            createPartDto.TYPE = element.TYPE;
            createPartDto.company= new Company();
            createPartDto.company.id = 'aaa-aaa-aaa'     
            try {
            await this.PartRepository.save(createPartDto);  
            } catch (error) {
              console.log(error)
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
        TYPE: 'R',
        company: {id: companyId},

      },
      take:20,
      
       relations:{ PriorityProductsHierarchy: true}
      
    }
    );
    return res;
  }

  async findOne(id: string) {
    return await this.PartRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        PriorityProductsLocation: true,
        PriorityProductsHierarchy: true,
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
      relations:{
        PriorityProductsHierarchy: true,
      PriorityProductsLocation: true,}
    });
  }

  // async findChildByParentPart(id: string) {
  //   const sqlQuery =
  //     //   '   SELECT P.PART, C.SON , 	PL.[quantity], PL.[stockDate],  ' +
  //     //   ' (SELECT DT.[PARTNAME] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTNAME, ' +
  //     //   ' (SELECT DT.[PARTDES] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTDES, ' +
  //     //   ' (SELECT DT.[BARCODE] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS BARCODE ' +
  //     //   ' FROM [dbo].[priorityProducts] AS P ' +
  //     //   ' inner join  [dbo].[priorityProductsHierarchy] C  on P.[PART] = C.[PART] ' +
  //     //   ' left join [dbo].[priorityProductsLocation] PL on P.[id] = PL.[priorityProductsId] ';
  //     // sqlQuery += " where   P.[PARTNAME] = '" + id + "'";

  //     ` SELECT PP.PARTNAME, PL.location, PL.stockDate, PL.quantity , Z.zoneName ` +
  //     ` FROM [dbo].[priorityProducts]  PP left join  [dbo].[priorityProductsLocation] PL on PL.priorityProductsId = PP.id ` +
  //     ` left join [dbo].zone Z on Z.id = PL.zoneId ` +
  //     ` WHERE  PP.PART IN ( ` +
  //     ` SELECT   C.[SON] FROM [dbo].[priorityProducts]  P  left join  [dbo].[priorityProductsHierarchy] C  on P.[PART] = C.[PART]  ` +
  //     ` where   P.[PARTNAME] = '` +
  //     id +
  //     `') order by PP.PARTNAME, Z.priority `;
  //   const res = await this.PartRepository.query(sqlQuery);
  //   return res;
  // }

  // async findChildByParent(id: string) {
  //   let sqlQuery =
  //     '   SELECT P.PART, C.SON , 	  ' +
  //     ' (SELECT DT.[PARTNAME] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTNAME, ' +
  //     ' (SELECT DT.[PARTDES] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTDES, ' +
  //     ' (SELECT DT.[BARCODE] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS BARCODE ' +
  //     '  FROM [dbo].[priorityProducts]  P ' +
  //     ' left join  [dbo].[priorityProductsHierarchy] C  on P.[PART] = C.[PART] ';
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
