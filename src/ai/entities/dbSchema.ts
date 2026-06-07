export const dbSchemaForUi = [
  {
    table: 'all_grv',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'DataInfo',
      },
      {
        name: 'PartNumber',
      },
      {
        name: 'QTYtoassemble',
      },
      {
        name: 'QTYassembled',
      },
      {
        name: 'Total',
      },
      {
        name: 'Supplier',
      },
      {
        name: 'PalletNumber',
      },
      {
        name: 'PO',
      },
      {
        name: 'taskInfo',
      },
      {
        name: 'Location',
      },
      {
        name: 'NoOfBoxes',
      },
      {
        name: 'NoOfItems',
      },
      {
        name: 'orderName',
      },
      {
        name: 'remarks',
      },
      {
        name: 'bulkQauntity',
      },
      {
        name: 'orderid',
      },
      {
        name: 'orderlineId',
      },
      {
        name: 'taskPriority',
      },
      {
        name: 'rmaNumber',
      },
      {
        name: 'trackingNumber',
      },
      {
        name: 'statusRma',
      },
      {
        name: 'customerName',
      },
      {
        name: 'cylinder',
      },
      {
        name: 'backToInventory',
      },
      {
        name: 'taskTypeId',
      },
      {
        name: 'userId',
      },
      {
        name: 'taskStatusId',
      },
      {
        name: 'companyId',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
      {
        name: 'CURDATE',
      },
    ],
  },
  {
    table: 'all_inventory_count',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'DataInfo',
      },
      {
        name: 'PartNumber',
      },
      {
        name: 'QTYtoassemble',
      },
      {
        name: 'QTYassembled',
      },
      {
        name: 'Total',
      },
      {
        name: 'BIN',
      },
      {
        name: 'QTY',
      },
      {
        name: 'BIN_1',
      },
      {
        name: 'QTY_1',
      },
      {
        name: 'BIN_2',
      },
      {
        name: 'QTY_2',
      },
      {
        name: 'Supplier',
      },
      {
        name: 'PalletNumber',
      },
      {
        name: 'PO',
      },
      {
        name: 'taskInfo',
      },
      {
        name: 'Location',
      },
      {
        name: 'NoOfBoxes',
      },
      {
        name: 'NoOfItems',
      },
      {
        name: 'orderName',
      },
      {
        name: 'remarks',
      },
      {
        name: 'bulkQauntity',
      },
      {
        name: 'orderid',
      },
      {
        name: 'orderlineId',
      },
      {
        name: 'taskPriority',
      },
      {
        name: 'rmaNumber',
      },
      {
        name: 'trackingNumber',
      },
      {
        name: 'statusRma',
      },
      {
        name: 'customerName',
      },
      {
        name: 'cylinder',
      },
      {
        name: 'backToInventory',
      },
      {
        name: 'taskTypeId',
      },
      {
        name: 'userId',
      },
      {
        name: 'taskStatusId',
      },
      {
        name: 'companyId',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
    ],
  },
  {
    table: 'all_rma',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'CUSTNAME',
      },
      {
        name: 'CUSTDES',
      },
      {
        name: 'CURDATE',
      },
      {
        name: 'DOCNO',
      },
      {
        name: 'DETAILS',
      },
      {
        name: 'STATDES',
      },
      {
        name: 'FBCM_RETREASONCODE',
      },
      {
        name: 'FBCM_RETREASONDES',
      },
      {
        name: 'Title',
      },
      {
        name: 'trackingNumber',
      },
      {
        name: 'taskPriority',
      },
      {
        name: 'remarks',
      },
      {
        name: 'userId',
      },
      {
        name: 'companyId',
      },
      {
        name: 'taskStatusId',
      },
    ],
  },
  {
    table: 'boxsize',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'sizeDesc',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'company',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'name',
      },
      {
        name: 'description',
      },
      {
        name: 'Ssn',
      },
      {
        name: 'companySettingId',
      },
    ],
  },
  {
    table: 'company_setting',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'priorityApiUrl',
      },
      {
        name: 'priorityApiCompany',
      },
      {
        name: 'priorityApiUser',
      },
      {
        name: 'priorityApiPassword',
      },
      {
        name: 'priorityOrderStatus',
      },
      {
        name: 'priorityPoStatus',
      },
      {
        name: 'priorityRmaStatus',
      },
      {
        name: 'priorityProductStatus',
      },
      {
        name: 'priorityOrderLineStatus',
      },
      {
        name: 'addtionalPickingInfo',
      },
      {
        name: 'qcRequired',
      },
      {
        name: 'shipmentUrl',
      },
      {
        name: 'shipmentUser',
      },
      {
        name: 'shipmentPassword',
      },
      {
        name: 'shipmentCallBack',
      },
      {
        name: 'boxItemsCount',
      },
    ],
  },
  {
    table: 'cylinder',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'partName',
      },
      {
        name: 'description',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'ddd',
    fields: [
      {
        name: 'ן»¿id',
      },
      {
        name: 'ShipmentCode',
      },
      {
        name: 'ShippingMethod',
      },
      {
        name: 'priority',
      },
      {
        name: 'shipRushCode',
      },
      {
        name: 'shipRushAcountNumber',
      },
    ],
  },
  {
    table: 'deliverysetting',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'siteName',
      },
      {
        name: 'uomweight',
      },
      {
        name: 'uomLength',
      },
      {
        name: 'upsAcountNumber',
      },
      {
        name: 'accountId',
      },
      {
        name: 'PickupReadyTime',
      },
      {
        name: 'LatestPickupTime',
      },
      {
        name: 'FirstName',
      },
      {
        name: 'Company',
      },
      {
        name: 'Address1',
      },
      {
        name: 'Address2',
      },
      {
        name: 'City',
      },
      {
        name: 'State',
      },
      {
        name: 'Country',
      },
      {
        name: 'PostalCode',
      },
      {
        name: 'Phone',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'log',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'subject',
      },
      {
        name: 'message',
      },
      {
        name: 'level',
      },
      {
        name: 'context',
      },
      {
        name: 'metadata',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'order',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'CUSTNAME',
      },
      {
        name: 'CUSTNO',
      },
      {
        name: 'ORDNAME',
      },
      {
        name: 'STCODE',
      },
      {
        name: 'STDES',
      },
      {
        name: 'ADDRESS',
      },
      {
        name: 'ADDRESS2',
      },
      {
        name: 'ADDRESS3',
      },
      {
        name: 'STATE',
      },
      {
        name: 'STATECODE',
      },
      {
        name: 'STATENAME',
      },
      {
        name: 'CURDATE',
      },
      {
        name: 'ZIP',
      },
      {
        name: 'COUNTRYNAME',
      },
      {
        name: 'ordertext',
      },
      {
        name: 'orderRemarks',
      },
      {
        name: 'priorityOrder',
      },
      {
        name: 'shipmentOrder',
      },
      {
        name: 'DETAILS',
      },
      {
        name: 'ShData',
      },
      {
        name: 'CUSTDES',
      },
      {
        name: 'NAME',
      },
      {
        name: 'PHONENUM',
      },
      {
        name: 'FAX',
      },
      {
        name: 'trackingNumber',
      },
      {
        name: 'shipRushStatus',
      },
      {
        name: 'shipRushDeliveryId',
      },
      {
        name: 'DOCUMENT_DOCNO',
      },
      {
        name: 'DOCUMENT_DOC',
      },
      {
        name: 'shipRushShipmentId',
      },
      {
        name: 'accountId',
      },
      {
        name: 'accountZip',
      },
      {
        name: 'orderNote',
      },
      {
        name: 'Pallet',
      },
      {
        name: 'userId',
      },
      {
        name: 'taskStatusId',
      },
      {
        name: 'roleId',
      },
      {
        name: 'comapnyId',
      },
      {
        name: 'CustomerPO',
      },
    ],
  },
  {
    table: 'order_basket',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'basketId',
      },
      {
        name: 'basketRemarks',
      },
      {
        name: 'orderId',
      },
    ],
  },
  {
    table: 'order_boxes',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'lineRemarks',
      },
      {
        name: 'boxweight',
      },
      {
        name: 'boxNo',
      },
      {
        name: 'boxSizeId',
      },
      {
        name: 'orderId',
      },
      {
        name: 'itemsCount',
      },
      {
        name: 'updatedBy',
      },
    ],
  },
  {
    table: 'order_boxes_items',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'partNumber',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
      {
        name: 'itemsCount',
      },
      {
        name: 'orderId',
      },
      {
        name: 'orderBoxesId',
      },
      {
        name: 'updatedBy',
      },
      {
        name: 'orderLineItemsCount',
      },
    ],
  },
  {
    table: 'order_line',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'PARTNAME',
      },
      {
        name: 'PARTDES',
      },
      {
        name: 'TBALANCE',
      },
      {
        name: 'Fullfilled',
      },
      {
        name: 'FullfilledSuperViser',
      },
      {
        name: 'BARCODE',
      },
      {
        name: 'lineRemarks',
      },
      {
        name: 'approved',
      },
      {
        name: 'picked',
      },
      {
        name: 'pickingError',
      },
      {
        name: 'prioritykline',
      },
      {
        name: 'priorityremarks',
      },
      {
        name: 'pickingAid',
      },
      {
        name: 'assemblyAid',
      },
      {
        name: 'ORDI',
      },
      {
        name: 'orderId',
      },
      {
        name: 'taskStatusId',
      },
    ],
  },
  {
    table: 'partcqaunt',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'partName',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'priorityproducts',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'PARTNAME',
      },
      {
        name: 'TYPE',
      },
      {
        name: 'BARCODE',
      },
      {
        name: 'PART',
      },
      {
        name: 'PARTDES',
      },
      {
        name: 'companyId',
      },
      {
        name: 'STATDES',
      },
    ],
  },
  {
    table: 'priorityproductshierarchy',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'PART',
      },
      {
        name: 'SON',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'priorityproductslocation',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'location',
      },
      {
        name: 'stockDate',
      },
      {
        name: 'quantity',
      },
      {
        name: 'priorityProductsId',
      },
      {
        name: 'zoneId',
      },
      {
        name: 'remarks',
      },
    ],
  },
  {
    table: 'product_status',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'productStatus',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'report_view',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'reportName',
      },
      {
        name: 'reportTitleName',
      },
      {
        name: 'publish',
      },
      {
        name: 'createdAt',
      },
      {
        name: 'reportType',
      },
    ],
  },
  {
    table: 'role',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'role',
      },
      {
        name: 'roleDisplayName',
      },
      {
        name: 'color',
      },
    ],
  },
  {
    table: 'shipment_priority',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'ShipmentCode',
      },
      {
        name: 'ShippingMethod',
      },
      {
        name: 'priority',
      },
      {
        name: 'shipRushCode',
      },
      {
        name: 'shipRushAcountNumber',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'task_grv',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'PartNumber',
      },
      {
        name: 'NoOfBoxes_0',
      },
      {
        name: 'NoOfItems_0',
      },
      {
        name: 'NoOfBoxes_1',
      },
      {
        name: 'NoOfItems_1',
      },
      {
        name: 'NoOfBoxes_2',
      },
      {
        name: 'NoOfItems_2',
      },
      {
        name: 'NoOfBoxes_3',
      },
      {
        name: 'NoOfItems_3',
      },
      {
        name: 'NoOfBoxes_4',
      },
      {
        name: 'NoOfItems_4',
      },
      {
        name: 'NoOfBoxes_5',
      },
      {
        name: 'NoOfItems_5',
      },
      {
        name: 'bulkQauntity',
      },
      {
        name: 'Total',
      },
      {
        name: 'allGrvId',
      },
      {
        name: 'DataInfo',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
      {
        name: 'quantityRequired',
      },
      {
        name: 'task_grvcol',
      },
    ],
  },
  {
    table: 'task_inventory_count',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'DataInfo',
      },
      {
        name: 'PartNumber',
      },
      {
        name: 'NoOfBoxes_0',
      },
      {
        name: 'NoOfItems_0',
      },
      {
        name: 'NoOfBoxes_1',
      },
      {
        name: 'NoOfItems_1',
      },
      {
        name: 'NoOfBoxes_2',
      },
      {
        name: 'NoOfItems_2',
      },
      {
        name: 'NoOfBoxes_3',
      },
      {
        name: 'NoOfItems_3',
      },
      {
        name: 'NoOfBoxes_4',
      },
      {
        name: 'NoOfItems_4',
      },
      {
        name: 'NoOfBoxes_5',
      },
      {
        name: 'NoOfItems_5',
      },
      {
        name: 'bulkQauntity',
      },
      {
        name: 'Total',
      },
      {
        name: 'allInventoryCountId',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
      {
        name: 'location',
      },
    ],
  },
  {
    table: 'task_rma',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'PartNumber',
      },
      {
        name: 'partQount',
      },
      {
        name: 'backToInventory',
      },
      {
        name: 'productStatus',
      },
      {
        name: 'cylinder',
      },
      {
        name: 'remarks',
      },
      {
        name: 'allRmaId',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
    ],
  },
  {
    table: 'task_status',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'status',
      },
      {
        name: 'color',
      },
    ],
  },
  {
    table: 'task_type',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'role',
      },
    ],
  },
  {
    table: 'task_user',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'DataInfo',
      },
      {
        name: 'PartNumber',
      },
      {
        name: 'QTYtoassemble',
      },
      {
        name: 'QTYassembled',
      },
      {
        name: 'Total',
      },
      {
        name: 'BIN',
      },
      {
        name: 'QTY',
      },
      {
        name: 'BIN_1',
      },
      {
        name: 'QTY_1',
      },
      {
        name: 'BIN_2',
      },
      {
        name: 'QTY_2',
      },
      {
        name: 'Supplier',
      },
      {
        name: 'PalletNumber',
      },
      {
        name: 'PO',
      },
      {
        name: 'taskInfo',
      },
      {
        name: 'Location',
      },
      {
        name: 'NoOfBoxes',
      },
      {
        name: 'NoOfItems',
      },
      {
        name: 'orderName',
      },
      {
        name: 'remarks',
      },
      {
        name: 'bulkQauntity',
      },
      {
        name: 'orderid',
      },
      {
        name: 'orderlineId',
      },
      {
        name: 'taskPriority',
      },
      {
        name: 'rmaNumber',
      },
      {
        name: 'trackingNumber',
      },
      {
        name: 'pictureOne',
      },
      {
        name: 'pictureTwo',
      },
      {
        name: 'statusRma',
      },
      {
        name: 'customerName',
      },
      {
        name: 'cylinder',
      },
      {
        name: 'backToInventory',
      },
      {
        name: 'taskTypeId',
      },
      {
        name: 'userId',
      },
      {
        name: 'taskStatusId',
      },
      {
        name: 'companyId',
      },
      {
        name: 'productName',
      },
      {
        name: 'productDescription',
      },
    ],
  },
  {
    table: 'tt',
    fields: [
      {
        name: 'id',
      },
      {
        name: 'partName',
      },
    ],
  },
  {
    table: 'user',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'userName',
      },
      {
        name: 'userSurname',
      },
      {
        name: 'userUuid',
      },
      {
        name: 'userMail',
      },
      {
        name: 'userMobile',
      },
      {
        name: 'color',
      },
      {
        name: 'userPasswordEnc',
      },
      {
        name: 'selectedCompany',
      },
      {
        name: 'otp',
      },
    ],
  },
  {
    table: 'user_company',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'usersId',
      },
      {
        name: 'companyId',
      },
    ],
  },
  {
    table: 'users_roles',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'usersId',
      },
      {
        name: 'roleId',
      },
    ],
  },
  {
    table: 'zone',
    fields: [
      {
        name: 'updatedBy',
      },
      {
        name: 'id',
      },
      {
        name: 'zoneName',
      },
      {
        name: 'color',
      },
      {
        name: 'priority',
      },
      {
        name: 'companyId',
      },
    ],
  },
];
