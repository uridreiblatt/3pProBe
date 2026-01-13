import { Injectable } from "@nestjs/common";

import { ReportView } from "./entities/report-view.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ReportViewService {
  constructor(
    @InjectRepository(ReportView)
    private reportViewRepository: Repository<ReportView>
  ) {}

  async findAll() {
    return await this.reportViewRepository.find();
  }

  async DashBoard() {
    const queryTasks = "SELECT  * FROM  [V_DashBoardTasks] ";
    const dataTasks = await this.reportViewRepository.query(queryTasks);
    const queryOrders = "SELECT  * FROM  [V_DashBoardOrders] ";
    const dataOrders = await this.reportViewRepository.query(queryOrders);
    const allData = {
      tasks: dataTasks,
      orders: dataOrders,
    };
    return allData;
  }

  async findOne(id: number) {
    const rpt =  await this.reportViewRepository.findOne({
      where: { id: id },
    });

    const queryViewFields = `
  SELECT 
  COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = ?
ORDER BY ORDINAL_POSITION;`;

    const dtFields = await this.reportViewRepository.query(queryViewFields, [
      rpt.reportTitleName,
    ]);

    const sql = `
  SELECT *
  FROM ${rpt.reportTitleName}
  WHERE comapnyId = ?`;

    const data = await this.reportViewRepository.query(sql, ["aaa-aaa-aaa"]);

    const allData = {
      currentReport: rpt,      
      fields: dtFields,
      data: data,
    };
    return allData;
  }
}
