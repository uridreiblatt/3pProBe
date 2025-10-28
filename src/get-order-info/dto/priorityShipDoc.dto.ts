export interface ShipDocument {
  ORDNAME: string;
  AIRWAYBILL: string;
}

export interface ShipDocumentUpdate {
  DOCNO: string;
  DOC: number;
  TRANSORDER_D_SUBFORM: TransorderDSubform[];
  STATDES: string;
}

export interface TransorderDSubform {
  PARTNAME: string;
  KLINE: number;
  TRANS: number;
  TYPE: string;
  TQUANT: number;
}
