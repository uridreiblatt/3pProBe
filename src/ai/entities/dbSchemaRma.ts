export const rmaSql = `SELECT ar.DOCNO, ar.DETAILS, ar.FBCM_RETREASONDES,ar.Title,
tr.PartNumber,tr.productDescription,tr.partQount,tr.productName, u.userName,ts.status
FROM p3pro.all_rma ar , p3pro.task_rma tr, p3pro.user u, p3pro.task_status ts
where tr.allRmaId=ar.id
and ar.userId=u.id
and ar.taskStatusId = ts.id
and companyId = 'aaa-aaa-aaa'`;

export const dbSchemaForUi = {
  domains: {
    rma: {
      main: 'all_rma',
      tables: {
        all_rma: [
          'id',
          'DOCNO',
          'CURDATE',
          'CUSTNAME',
          'CUSTDES',
          'DETAILS',
          'STATDES',
          'FBCM_RETREASONCODE',
          'FBCM_RETREASONDES',
          'Title',
          'trackingNumber',
          'taskPriority',
          'remarks',
          'userId',
          'companyId',
          'taskStatusId',
        ],
        task_rma: [
          'id',
          'PartNumber',
          'partQount',
          'productName',
          'productDescription',
          'productStatus',
          'backToInventory',
          'cylinder',
          'remarks',
          'allRmaId',
        ],
        task_status: ['id', 'status', 'color'],
        user: ['id', 'userName', 'userSurname', 'userMail'],
      },
      relations: [
        ['task_rma', 'allRmaId', 'all_rma', 'id'],
        ['all_rma', 'taskStatusId', 'task_status', 'id'],
        ['all_rma', 'userId', 'user', 'id'],
      ],
    },

    products: {
      main: 'priorityproducts',
      tables: {
        priorityproducts: [
          'id',
          'PART',
          'PARTNAME',
          'PARTDES',
          'TYPE',
          'BARCODE',
          'STATDES',
          'companyId',
        ],
        priorityproductslocation: [
          'id',
          'location',
          'stockDate',
          'quantity',
          'priorityProductsId',
          'zoneId',
          'remarks',
        ],
        priorityproductshierarchy: ['id', 'PART', 'SON', 'companyId'],
        zone: ['id', 'name'],
      },
      relations: [
        [
          'priorityproductslocation',
          'priorityProductsId',
          'priorityproducts',
          'id',
        ],
        ['priorityproductslocation', 'zoneId', 'zone', 'id'],
        ['priorityproductshierarchy', 'PART', 'priorityproducts', 'PART'],
        ['priorityproductshierarchy', 'SON', 'priorityproducts', 'PART'],
      ],
    },

    orders: {
      main: 'orders',
      tables: {
        orders: [
          'id',
          'orderNumber',
          'customerName',
          'status',
          'createdAt',
          'companyId',
        ],
        order_items: [
          'id',
          'orderId',
          'partNumber',
          'productName',
          'quantity',
          'price',
        ],
      },
      relations: [['order_items', 'orderId', 'orders', 'id']],
    },

    grv: {
      main: 'grv',
      tables: {
        grv: [
          'id',
          'grvNumber',
          'supplierName',
          'status',
          'createdAt',
          'companyId',
        ],
        grv_items: ['id', 'grvId', 'partNumber', 'productName', 'quantity'],
      },
      relations: [['grv_items', 'grvId', 'grv', 'id']],
    },
  },
};
