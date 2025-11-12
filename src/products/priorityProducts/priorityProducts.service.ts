import { Injectable } from '@nestjs/common';
import { PriorityProducts } from './entities/priorityProducts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class priorityProductsService {
  constructor(
    @InjectRepository(PriorityProducts)
    private PartRepository: Repository<PriorityProducts>,
  ) {}

  async findAll() {
    // return await this.PartRepository.find({
    //   // take: 100,
    // });
    const sqlQuery =
      'SELECT  pp.[id] ,pp.[PARTNAME]  ,pp.[PART] ,pp.[PARTDES] ,pp.[BARCODE],pp.[TYPE] ,pl.[location] , z.[zoneName],  cast(pl.[stockDate]as nvarchar) as stockDate,pl.[quantity]   ' +
      ' FROM [dbo].[priorityProducts] pp  ' +
      ' left JOIN  [dbo].[priorityProductsLocation] pl ON pp.[id]= pl.[priorityProductsId] ' +
      ' left JOIN [dbo].[zone] z ON pl.[zoneId] = z.id order by isnull(z.priority,100) ';
    const res = await this.PartRepository.query(sqlQuery);
    return res;
  }

  async findOne(id: string) {
    return await this.PartRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        PriorityProductsLocation: true,
      },
    });
  }

  async findBarcode(barcode: string) {
    return await this.PartRepository.findOne({
      select: {
        PARTNAME: true,
      },
      where: {
        BARCODE: barcode,
      },
    });
  }

  async findChildByParentPart(id: string) {
    const sqlQuery =
      //   '   SELECT P.PART, C.SON , 	PL.[quantity], PL.[stockDate],  ' +
      //   ' (SELECT DT.[PARTNAME] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTNAME, ' +
      //   ' (SELECT DT.[PARTDES] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTDES, ' +
      //   ' (SELECT DT.[BARCODE] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS BARCODE ' +
      //   ' FROM [dbo].[priorityProducts] AS P ' +
      //   ' inner join  [dbo].[priorityProductsHierarchy] C  on P.[PART] = C.[PART] ' +
      //   ' left join [dbo].[priorityProductsLocation] PL on P.[id] = PL.[priorityProductsId] ';
      // sqlQuery += " where   P.[PARTNAME] = '" + id + "'";

      ` SELECT PP.PARTNAME, PL.location, PL.stockDate, PL.quantity , Z.zoneName ` +
      ` FROM [dbo].[priorityProducts]  PP left join  [dbo].[priorityProductsLocation] PL on PL.priorityProductsId = PP.id ` +
      ` left join [dbo].zone Z on Z.id = PL.zoneId ` +
      ` WHERE  PP.PART IN ( ` +
      ` SELECT   C.[SON] FROM [dbo].[priorityProducts]  P  left join  [dbo].[priorityProductsHierarchy] C  on P.[PART] = C.[PART]  ` +
      ` where   P.[PARTNAME] = '` +
      id +
      `') order by PP.PARTNAME, Z.priority `;
    const res = await this.PartRepository.query(sqlQuery);
    return res;
  }

  async findChildByParent(id: string) {
    let sqlQuery =
      '   SELECT P.PART, C.SON , 	  ' +
      ' (SELECT DT.[PARTNAME] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTNAME, ' +
      ' (SELECT DT.[PARTDES] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS PARTDES, ' +
      ' (SELECT DT.[BARCODE] FROM [dbo].[priorityProducts] DT WHERE DT.PART = C.SON ) AS BARCODE ' +
      '  FROM [dbo].[priorityProducts]  P ' +
      ' left join  [dbo].[priorityProductsHierarchy] C  on P.[PART] = C.[PART] ';
    sqlQuery += " where   P.[id] = '" + id + "'";
    //} else {
    //  sqlQuery += " AND  P.[PARTNAME] = '" + id + "'";
    //}

    const res = await this.PartRepository.query(sqlQuery);
    return res;
  }

  // async update(id: number, updatePartDto: UpdatePartDto) {
  //   return await this.PartRepository.update(id, updatePartDto);
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} part`;
  // }
}
