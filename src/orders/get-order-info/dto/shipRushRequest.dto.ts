export interface RootShipRequest {
  Request: ShipRequest;
}

export interface ShipRequest {
  //ShipSettings: ShipSettings;
  ShipTransaction: ShipTransaction;
  //'_xmlns:xsi': string;
  //'_xmlns:xsd': string;
}

export interface ShipSettings {
  PrinterShippingLabel: PrinterShippingLabel;
}

export interface PrinterShippingLabel {
  AutoprintShippingLabel: string;
  LabelType: string;
}

export interface ShipTransaction {
  Order: Order;
  Shipment: Shipment;
}

export interface Order {
  //CustomerPO: string;
  //PostbackUrl: string;
  OrderNumber: string;
  //OrderId: string;
  ExternalID: string;
  PaymentStatus: number;
}

export interface Shipment {
  CustomerReference: string;
  UnitsOfMeasureLinear: string;
  UOMWeight: string;
  LatestPickupTime: string;
  PickupReadyTime: string;
  IsTest: string;
  Carrier: string;
  HasDeliveryNotification: number;
  DeliveryNotificationEmail: string;
  HasShipNotification: number;
  PostbackUrl: string;
  PostbackContentType: string;
  //ShippingAccount: ShippingAccount;
  ChargeType: string;
  UPSServiceType: string;
  Package: Package[];
  DeliveryAddress: DeliveryAddress;
  ShipperAddress: ShipperAddress;
  Shipper3PartyBillingAddress: Shipper3PartyBillingAddress;
}

// <Shipper3PartyBillingAddress>
// 				<UPSAccountNumber>686506657</UPSAccountNumber>
// 				<Address>
// 					<StateOrEmpty/>
// 					<Country>US</Country>
// 					<StateAsString>Unknown</StateAsString>
// 					<CountryAsString>US</CountryAsString>
// 				</Address>
// 			</Shipper3PartyBillingAddress>

export interface Shipper3PartyBillingAddress {
  UPSAccountNumber: string;
  Address: AdShipper3PartyBillingAddress;
}

export interface AdShipper3PartyBillingAddress {
  StateOrEmpty: string;
  Country: string;
  StateAsString: string;
  CountryAsString: string;
  PostalCode: string;
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

export interface ShipperAddress {
  UPSAccountNumber: string;
  Address: Address2;
}

export interface Address2 {
  FirstName: string;
  Company: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Country: string;
  PostalCode: string;
  Phone: string;
}

export const Headertmp = `<?xml version="1.0" encoding="utf-8"?>
<Request xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<!-- This example shows the use of the ShipSettings section to control the label type returned. -->`;
