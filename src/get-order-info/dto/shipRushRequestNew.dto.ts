export interface RootShipRequest {
  Request: Request;
}

export interface ShipRequest {
  ShipTransaction: ShipTransaction;
}

export interface ShipTransaction {
  Order: Order;
  Shipment: Shipment;
}

export interface Order {
  //CustomerPO: string;
  //PostbackUrl: string;
  OrderNumber: string;
  PaymentStatus: number;
  //OrderId: string;
  ExternalID: string;
}

export interface Shipment {
  CustomerReference: string;
  UnitsOfMeasureLinear: string;
  IsTest: string;
  Carrier: string;
  HasDeliveryNotification: number;
  DeliveryNotificationEmail: string;
  HasShipNotification: number;
  PostbackUrl: string;
  //ShippingAccount: ShippingAccount;
  UPSServiceType: string;
  Package: Package[];
  DeliveryAddress: DeliveryAddress;
  //ShipperAddress: ShipperAddress;
}

export interface ShippingAccount {
  ShippingAccountId: string;
}

export interface Package {
  PackageActualWeight: string;
  PackagingType: string;
  PkgLength?: string;
  PkgHeight?: string;
  PkgWidth?: string;
  PackageReference1: string;
  PackageReference2: string;
  InsuranceAmount: string;
}

export interface DeliveryAddress {
  Address: Address;
}

export interface Address {
  FirstName: string;
  Company: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Country: string;
  PostalCode: string;
  Phone: string;
  EMail: string;
}

// export interface ShipperAddress {
//   Address: Address2;
// }

// export interface Address2 {
//   FirstName: string;
//   Company: string;
//   Address1: string;
//   Address2: string;
//   City: string;
//   State: string;
//   Country: string;
//   PostalCode: string;
//   Phone: string;
// }

export const HeadertmpNew = `<?xml version="1.0" encoding="utf-8"?>`;
