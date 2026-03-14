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

  async DashBoard(companyId: string, roleId: number, userId: string) {
    const queryTasks =
      "select " +
      // " (select u.userName from user u where u.id = userId) as userName " +
      // " ,(select u.status from task_status u where u.id = taskStatusId) as status " +
      " (select u.role from task_type u where u.id = taskTypeId) as task_type " +
      " , taskTypeId " +
      // " ,userId " +
      " , count(*)  as count " +
      " from task_user tu " +
      " where tu.companyId = '" +
      companyId +
      "' " +
      " group by   taskTypeId; "; //taskStatusId, userId
    const dataTasks = await this.reportViewRepository.query(queryTasks);
    const queryOrders =
      "SELECT  " +
      " (select u.userName from user u where u.id = userId) as userName " +
      " ,(select u.status from task_status u where u.id = taskStatusId) as status " +
      " ,(select u.roleDisplayName from role u where u.id = roleId) as role " +
      " ,userId " +
      " ,roleId " +
      " , count(*)  as count " +
      " ,userId " +
      " FROM p3pro.order o " +
      " where o.comapnyId = '"+companyId+"' " +
      //" and roleId = 1 " +
      //and userId in ('aaa-bbb-ccc','94cb0799-a7d0-4c84-9ab9-ca36ed161d32')
      " group by taskStatusId, roleId, userId; ";
    const dataOrders = await this.reportViewRepository.query(queryOrders);
    const queryRma =
      " select " +
      " (select u.userName from user u where u.id = userId) as userName" +
      " ,(select u.status from task_status u where u.id = taskStatusId) as status" +
      " ,'rma' as task_type" +
      " ,userId" +
      " , count(*) as count" +
      " ,userId " +
      " from all_rma ar" +
      " where ar.companyId = '" +
      companyId +
      "' " +
      " group by taskStatusId, userId; ";
    const dataRma = await this.reportViewRepository.query(queryRma);


    const queryOrderalert = "SELECT count(*) as count FROM p3pro.order p WHERE  taskStatusId = 4   OR (    CURDATE < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3  )";
    const orderalert = await this.reportViewRepository.query(queryOrderalert);
    const queryRmaalert = "SELECT count(*) as count FROM p3pro.all_rma p WHERE  taskStatusId = 4   OR (    CURDATE < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3  )";
    const rmaAlert = await this.reportViewRepository.query(queryRmaalert);
    const queryTaskalert = "SELECT count(*) as count FROM p3pro.task_user p WHERE  taskStatusId = 4   OR (    created_at < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3  )";
    const taskAlert = await this.reportViewRepository.query(queryTaskalert);
    const allData = {
      tasks: dataTasks,
      orders: dataOrders,
      rma: dataRma,
      orderalert: orderalert?.[0].count || 0,
      rmaAlert:rmaAlert?.[0].count || 0,
      taskAlert:taskAlert?.[0].count || 0,

    };
    return allData;
    
  }

  async Notification(companyId: string, roleId: number, userId: string) {
    
    
    const queryOrderalert = "SELECT * FROM p3pro.order p WHERE  comapnyId = ? and (taskStatusId = 4   OR (    CURDATE < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3  ))";
    const orderalert = await this.reportViewRepository.query(queryOrderalert,[companyId]);
    const queryRmaalert = "SELECT * FROM p3pro.all_rma p WHERE  comapnyId = ? and (taskStatusId = 4   OR (    CURDATE < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3  ))";
    const rmaAlert = await this.reportViewRepository.query(queryRmaalert,[companyId]);
    const queryTaskalert = "SELECT * FROM p3pro.task_user p WHERE  comapnyId = ? and ( taskStatusId = 4   OR (  created_at < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3 ))";
    const taskAlert = await this.reportViewRepository.query(queryTaskalert,[companyId]);
    const allData = {
      
      orderalert: orderalert.map((o) => ({
        type:'order',
        id: o.id,
        name: o.ORDNAME,
        curDate:o.CURDATE,
        taskStatus: this.getTaskStatusName(o.taskStatusId ),    
        note:o.orderNote,
    })),
     rmaAlert:rmaAlert.map((o) => ({
      type:'rma',
      id: o.id,
      name: o.DOCNO,
      curDate:o.created_at,
      taskStatus: this.getTaskStatusName(o.taskStatusId),    
      note:o.remarks,
  })),
      taskAlert:taskAlert.map((o) => ({
      type:'tasks',
      id: o.id,
      name: o.DataInfo || '',
      curDate:o.created_at,
      taskStatus: this.getTaskStatusName(o.taskStatusId),    
      note:o.taskInfo || '',
  })),}
    return [...allData.orderalert,...allData.rmaAlert,...allData.taskAlert];
    
  }

  async findOne(companyId: string,id: number) {
    const rpt = await this.reportViewRepository.findOne({
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
  WHERE companyId = ?`;

    const data = await this.reportViewRepository.query(sql, [companyId]);

    const allData = {
      currentReport: rpt,
      fields: dtFields,
      data: data,
    };
    return allData;
  }


  getTaskStatusName(id: number){
      switch (id) {
        case 3:
            return 'complete';
        case 2:
          return 'in progress';
        case 4:          
            return 'pending';
        case 1:
            return 'new';
        case 7:
            return 'review';

        default:
            return 'general';
    }
  }
}
