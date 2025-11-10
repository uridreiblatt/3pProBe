export class Root {
  constructor() {
    this.ROOT = new Root2();
  }
  ROOT: Root2;
}

export class Root2 {
  constructor() {
    this.PERMISSION = new Permission();
  }
  PERMISSION: Permission;
  FILTERS: Filters;
  CARD_TYPE: string;
  CARD_TYPE_FILTER: string;
  FIELDS: Fields;
}

export class Permission {
  USERNAME: string;
  PASSWORD: string;
}

export class Filters {
  ACTIVE_WORKER: string;
  TID: string;
}

export class Fields {
  F_N: string;
  P_N: string;
  TID: string;
  ACTIVE_WORKER: string;
  MAIL: string;
  CELL: string;
  USER_ROLE: string;
  LIMITED_PERMISSION: string;
  YOM_HULEDET: string;
  MAHOZ_SAB: string;
  MAHOZ_SABAR: string;
  MISPAR_OVED: string;
}
