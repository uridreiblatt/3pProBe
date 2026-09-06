import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

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

  async DashBoard(companyId: string, roleId: number, userId: string) {
    // const queryTasks =
    //   'select ' +
    //   // " (select u.userName from user u where u.id = userId) as userName " +
    //   // " ,(select u.status from task_status u where u.id = taskStatusId) as status " +
    //   ' (select u.role from task_type u where u.id = taskTypeId) as task_type ' +
    //   ' , taskTypeId ' +
    //   // " ,userId " +
    //   ' , count(*)  as count ' +
    //   ' from `task_user` tu ' +
    //   " where tu.companyId = '" +
    //   companyId +
    //   "' " +
    //   ' group by   taskTypeId; '; //taskStatusId, userId
    const queryGrv =
      ' select ' +
      ' (select u.userName from user u where u.id = userId) as userName' +
      ' ,(select u.status from task_status u where u.id = taskStatusId) as status' +
      " ,'grv' as task_type" +
      ' ,userId' +
      ' , count(*) as count' +
      ' ,userId ' +
      ' from `all_grv` ar' +
      ' where ar.companyId = ? ' +
      ' and ar.taskStatusId !=3 ' +
      'group by taskStatusId, userId; ';
    //console.log('queryGrv', queryGrv);
    const dataTasksGrv = await this.reportViewRepository.query(queryGrv, [companyId]);
    const queryOrders =
      'SELECT  ' +
      ' (select u.userName from user u where u.id = userId) as userName ' +
      ' ,(select u.status from task_status u where u.id = taskStatusId) as status ' +
      ' ,(select u.roleDisplayName from role u where u.id = roleId) as role ' +
      ' ,userId ' +
      ' ,roleId ' +
      ' , count(*)  as count ' +
      ' ,userId ' +
      ' FROM `order` o ' +
      ' where o.companyId = ? ' +
      //" and roleId = 1 " +
      //and userId in ('aaa-bbb-ccc','94cb0799-a7d0-4c84-9ab9-ca36ed161d32')
      ' and !(o.roleId = 4 and o.taskStatusId = 3) ' +
      ' group by taskStatusId, roleId, userId; ';
    console.log('queryOrders', queryOrders);
    const dataOrders = await this.reportViewRepository.query(queryOrders, [companyId]);
    const queryRma =
      ' select ' +
      ' (select u.userName from user u where u.id = userId) as userName' +
      ' ,(select u.status from task_status u where u.id = taskStatusId) as status' +
      " ,'rma' as task_type" +
      ' ,userId' +
      ' , count(*) as count' +
      ' ,userId ' +
      ' from `all_rma` ar' +
      ' where ar.companyId = ? ' +
      ' and ar.taskStatusId != 3  group by taskStatusId, userId; ';
    console.log(queryRma);
    const dataRma = await this.reportViewRepository.query(queryRma, [companyId]);

    const queryOrderalert =
      'SELECT count(*) as count FROM `order` p WHERE companyId = ? AND (taskStatusId = 4 OR (p.created_at < CURDATE() - INTERVAL 5 DAY AND taskStatusId != 3))';
    const orderalert = await this.reportViewRepository.query(queryOrderalert, [companyId]);
    const queryRmaalert =
      'SELECT count(*) as count FROM `all_rma` p WHERE companyId = ? AND (taskStatusId = 4 OR (p.created_at < CURDATE() - INTERVAL 5 DAY AND taskStatusId != 3))';
    const rmaAlert = await this.reportViewRepository.query(queryRmaalert, [companyId]);
    const queryTaskalert =
      'SELECT count(*) as count FROM `task_user` p WHERE companyId = ? AND (taskStatusId = 4 OR (p.created_at < CURDATE() - INTERVAL 5 DAY AND taskStatusId != 3))';
    const taskAlert = await this.reportViewRepository.query(queryTaskalert, [companyId]);
    const allData = {
      tasks: dataTasksGrv,
      orders: dataOrders,
      rma: dataRma,
      orderalert: orderalert?.[0].count || 0,
      rmaAlert: rmaAlert?.[0].count || 0,
      taskAlert: taskAlert?.[0].count || 0,
    };
    return allData;
  }

  async Notification(companyId: string, roleId: number, userId: string) {
    const queryOrderalert =
      'SELECT * FROM `order` p WHERE companyId = ? AND (taskStatusId = 4 OR (p.created_at < CURDATE() - INTERVAL 5 DAY AND taskStatusId != 3))';
    const orderalert = await this.reportViewRepository.query(queryOrderalert, [
      companyId,
    ]);
    const queryRmaalert =
      'SELECT * FROM `all_rma` p WHERE companyId = ? AND (taskStatusId = 4 OR (p.created_at < CURDATE() - INTERVAL 5 DAY AND taskStatusId != 3))';
    const rmaAlert = await this.reportViewRepository.query(queryRmaalert, [
      companyId,
    ]);
    const queryTaskalert =
      'SELECT * FROM `task_user` p WHERE  companyId = ? and ( taskStatusId = 4   OR (  created_at < CURDATE() - INTERVAL 5 DAY    AND taskStatusId != 3 ))';
    const taskAlert = await this.reportViewRepository.query(queryTaskalert, [
      companyId,
    ]);
    const allData = {
      orderalert: orderalert.map((o) => ({
        type: 'order',
        id: o.id,
        name: o.ORDNAME,
        curDate: o.CURDATE,
        taskStatus: this.getTaskStatusName(o.taskStatusId),
        note: o.orderNote,
      })),
      rmaAlert: rmaAlert.map((o) => ({
        type: 'rma',
        id: o.id,
        name: o.DOCNO,
        curDate: o.created_at,
        taskStatus: this.getTaskStatusName(o.taskStatusId),
        note: o.remarks,
      })),
      taskAlert: taskAlert.map((o) => ({
        type: 'tasks',
        id: o.id,
        name: o.DataInfo || '',
        curDate: o.created_at,
        taskStatus: this.getTaskStatusName(o.taskStatusId),
        note: o.taskInfo || '',
      })),
    };
    return [...allData.orderalert, ...allData.rmaAlert, ...allData.taskAlert];
  }

  async findOne(companyId: string, id: number) {
    const rpt = await this.reportViewRepository.findOne({
      where: { id: id },
    });

    if (!rpt) {
      throw new NotFoundException('Report not found');
    }
    if (!rpt.reportName || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(rpt.reportName)) {
      throw new BadRequestException('Invalid report view name');
    }
    // Only registered reports backed by a view in this database may be queried.
    const views = await this.reportViewRepository.query(
      'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
      [rpt.reportName],
    );
    if (views.length === 0) {
      throw new NotFoundException('Report view not found');
    }
    const reportIdentifier = this.reportViewRepository.manager.connection.driver.escape(rpt.reportName);

    const queryViewFields = `
  SELECT 
  COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = ?
ORDER BY ORDINAL_POSITION;`;

    const dtFields = await this.reportViewRepository.query(queryViewFields, [
      rpt.reportName,
    ]);
    if (!dtFields.some(({ COLUMN_NAME }) => COLUMN_NAME === 'companyId')) {
      throw new BadRequestException('Report view must include companyId');
    }
    const cleanDtFields = dtFields.filter(
      ({ COLUMN_NAME }) =>
        COLUMN_NAME !== 'companyId' && COLUMN_NAME !== 'created_at',
    );
    const sql = `
  SELECT *
  FROM ${reportIdentifier}
  WHERE companyId = ?`;

    const data = await this.reportViewRepository.query(sql, [companyId]);

    const cleanedData = data.map(({ companyId, created_at, ...rest }) => rest);
    const allData = {
      currentReport: rpt,
      fields: cleanDtFields,
      data: cleanedData,
    };
    return allData;
  }

  getTaskStatusName(id: number) {
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
