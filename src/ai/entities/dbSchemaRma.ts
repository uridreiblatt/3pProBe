export const dbSchemaForUiRma = {
  relations: [
    {
      fromTable: 'all_rma',
      fromColumn: 'taskStatusId',
      toTable: 'task_status',
      toColumn: 'id',
    },
    {
      fromTable: 'all_rma',
      fromColumn: 'companyId',
      toTable: 'company',
      toColumn: 'id',
    },
    {
      fromTable: 'all_rma',
      fromColumn: 'userId',
      toTable: 'user',
      toColumn: 'id',
    },
    {
      fromTable: 'all_rma',
      fromColumn: 'userId',
      toTable: 'user',
      toColumn: 'id',
    },

    {
      fromTable: 'priorityproducts',
      fromColumn: 'companyId',
      toTable: 'company',
      toColumn: 'id',
    },
    {
      fromTable: 'priorityproductshierarchy',
      fromColumn: 'PART',
      toTable: 'priorityproducts',
      toColumn: 'PART',
    },
    {
      fromTable: 'priorityproductshierarchy',
      fromColumn: 'companyId',
      toTable: 'priorityproducts',
      toColumn: 'companyId',
    },
    {
      fromTable: 'priorityproductshierarchy',
      fromColumn: 'SON',
      toTable: 'priorityproducts',
      toColumn: 'PART',
    },
    {
      fromTable: 'priorityproductshierarchy',
      fromColumn: 'companyId',
      toTable: 'priorityproducts',
      toColumn: 'companyId',
    },
    {
      fromTable: 'priorityproductslocation',
      fromColumn: 'zoneId',
      toTable: 'zone',
      toColumn: 'id',
    },
    {
      fromTable: 'priorityproductslocation',
      fromColumn: 'priorityProductsId',
      toTable: 'priorityproducts',
      toColumn: 'id',
    },

    {
      fromTable: 'task_rma',
      fromColumn: 'allRmaId',
      toTable: 'all_rma',
      toColumn: 'id',
    },
    {
      fromTable: 'users_roles',
      fromColumn: 'roleId',
      toTable: 'role',
      toColumn: 'id',
    },
    {
      fromTable: 'users_roles',
      fromColumn: 'usersId',
      toTable: 'user',
      toColumn: 'id',
    },
  ],
  tables: [
    {
      table: 'all_rma',
      fields: [
        'updatedBy',
        'id',
        'CUSTNAME',
        'CUSTDES',
        'CURDATE',
        'DOCNO',
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
    },

    {
      table: 'priorityproducts',
      fields: [
        'id',
        'PARTNAME',
        'TYPE',
        'BARCODE',
        'PART',
        'PARTDES',
        'companyId',
        'STATDES',
      ],
    },
    {
      table: 'priorityproductshierarchy',
      fields: ['id', 'PART', 'SON', 'companyId'],
    },
    {
      table: 'priorityproductslocation',
      fields: [
        'id',
        'location',
        'stockDate',
        'quantity',
        'priorityProductsId',
        'zoneId',
        'remarks',
      ],
    },

    {
      table: 'role',
      fields: ['updatedBy', 'id', 'role', 'roleDisplayName', 'color'],
    },

    {
      table: 'task_rma',
      fields: [
        'updatedBy',
        'id',
        'PartNumber',
        'partQount',
        'backToInventory',
        'productStatus',
        'cylinder',
        'remarks',
        'allRmaId',
        'productName',
        'productDescription',
      ],
    },
    {
      table: 'task_status',
      fields: ['updatedBy', 'id', 'status', 'color'],
    },
    {
      table: 'task_type',
      fields: ['updatedBy', 'id', 'role'],
    },

    {
      table: 'user',
      fields: [
        'updatedBy',
        'id',
        'userName',
        'userSurname',
        'userUuid',
        'userMail',
        'userMobile',
        'color',
        'userPasswordEnc',
        'selectedCompany',
        'otp',
      ],
    },

    {
      table: 'users_roles',
      fields: ['updatedBy', 'id', 'usersId', 'roleId'],
    },
  ],
};
