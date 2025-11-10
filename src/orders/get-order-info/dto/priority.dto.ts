export interface RootPriority {
  '@odata.context': string;
  value: Value[];
}

export interface Value {
  CUSTNAME: string;
  CURDATE: string;
  ORDNAME: string;
  STCODE: string;
  STDES: string;
  CDES: string;
  DETAILS: string;
  ORDERITEMS_SUBFORM: OrderitemsSubform[];
  SHIPTO2_SUBFORM?: Shipto2Subform;
  ORDERSTEXT_SUBFORM?: OrderstextSubform;
  FBES_ACCOUNT: string;
  FBES_ZIP: string;
}
// export interface ThrdPparty {
//   ACCOUNT: string;
//   ZIP: string;
// }

export interface OrderitemsSubform {
  prioritykline(id: string, PARTNAME: string, prioritykline: any): unknown;
  PARTNAME: string;
  PDES: string;
  TBALANCE: number;
  BARCODE?: string;
  ORDISTATUSDES?: string;
  REMARK1?: string;
  KLINE: number;
  ORDI: number;
}

export interface Shipto2Subform {
  CUSTDES?: string;
  NAME?: string;
  PHONENUM?: string;
  FAX?: string;
  EMAIL: any;
  CELLPHONE: any;
  ADDRESS?: string;
  ADDRESS2?: string;
  ADDRESS3: any;
  STATE?: string;
  STATECODE?: string;
  STATENAME?: string;
  ZIP: string;
  COUNTRYNAME: string;
  COUNTRYCODE: string;
  CUSTDESA: any;
  NAMEA: any;
  ADDRESSA: any;
  STATEA: any;
  TAXCODE: string;
  HOUSE: any;
  SHIPPERNAME: any;
  SHIPPERDES: any;
  STCSHIPSTATIONA: any;
  SHIPACCOUNTNUM: any;
  CUPCODE: any;
  CIGCODE: any;
  MIKD_STATECODE?: string;
}

export interface OrderstextSubform {
  TEXT: string;
  APPEND: any;
  SIGNATURE: any;
}
