import { Injectable } from '@nestjs/common';

import { ReportView } from './entities/report-view.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportViewService {
  constructor(
    @InjectRepository(ReportView)
    private reportViewRepository: Repository<ReportView>,
  ) {}

  async findAll() {
    return await this.reportViewRepository.find();
  }

  async DashBoard() {
    const queryTasks = 'SELECT  * FROM  [V_DashBoardTasks] ';
    const dataTasks = await this.reportViewRepository.query(queryTasks);
    const queryOrders = 'SELECT  * FROM  [V_DashBoardOrders] ';
    const dataOrders = await this.reportViewRepository.query(queryOrders);
    const allData = {
      tasks: dataTasks,
      orders: dataOrders,
    };
    return allData;
  }

  async findOne(id: string) {
    const queryViewFields =
      'SELECT c.name   FROM [sys].[all_views] v ' +
      ' inner join [sys].[all_columns] c on v.object_id = c.object_id ' +
      " where v.name ='" +
      id +
      "'";
    const queryView = 'SELECT  * FROM ' + id;
    const dtFields = await this.reportViewRepository.query(queryViewFields);
    const data = await this.reportViewRepository.query(queryView);
    const allData = {
      fields: dtFields,
      data: data,
    };
    return allData;
  }
}
