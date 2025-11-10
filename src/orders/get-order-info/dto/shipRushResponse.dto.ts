export interface RootShipResponse {
  [x: string]: any;
  ShipResponse: ShipResponse;
}

export interface ShipResponse {
  Messages: Messages;
  IsSuccess: string;
  ShipTransaction: ShipTransaction;
  PostageBalance: string;
  PostageBalanceCurrency: string;
  '_xmlns:xsd': string;
  '_xmlns:xsi': string;
}

export interface Messages {
  ShippingMessage: ShippingMessage[];
}

export interface ShippingMessage {
  Severity: string;
  Text: string;
}

export interface ShipTransaction {
  Shipment: Shipment;
}

export interface Shipment {
  UnitsOfMeasureLinear: string;
  PostbackContentType: string;
  Documents: Documents;
  ShippingAccount: ShippingAccount;
  IsTest: string;
  LiftgatePickup: string;
  LiftgateDelivery: string;
  TradeshowPickup: string;
  TradeshowDelivery: string;
  ConstructionSitePickup: string;
  ConstructionSiteDelivery: string;
  LimitedAccessPickup: string;
  LimitedAccessPickupType: string;
  LimitedAccessDelivery: string;
  LimitedAccessDeliveryType: string;
  NotifyBeforeDelivery: string;
  Tags: string;
  ShipDateOnLabel: string;
  UseServiceAsString: string;
  IsWebShippingApiRequest: string;
  ChargeAmountSpecified: string;
  TimeInTransitDays: string;
  TimeInTransitBusinessDays: string;
  ShippedByEmail: string;
  ConsolidationSource: string;
  ConsolidationRouting: string;
  ConsolidationType: string;
  ConsolidationReferenceType: string;
  ConsolidationDistributionLocationType: string;
  ConsolidationField: string;
  PartiesToTransactionAreRelated: string;
  IsUPSNextDayAirDetected: string;
  ServiceTypeSetBy: string;
  CustomerReference: string;
  HasTenderedNotification: string;
  UseShipRushTrackingPage: string;
  CarbonNeutral: string;
  RequestPickup: string;
  UseAlternativeTrackingNumber: string;
  PickupByTime: string;
  PickupReadyTime: string;
  EstimatedDeliveryDate: string;
  PersonIdentityCheck: string;
  PersonDateOfBirth: string;
  UsePreferredDeliveryDate: string;
  PreferredDeliveryDate: string;
  AppointmentRequiredDelivery: string;
  AppointmentRequiredPickup: string;
  Inbond: string;
  ChainOfSignature: string;
  ProtectiveService: string;
  TailgateDelivery: string;
  TailgatePickup: string;
  Overlength: string;
  HazardousMaterial: string;
  PrivateResidencePickup: string;
  PrivateResidenceDelivery: string;
  JobsiteDelivery: string;
  JobsitePickup: string;
  AfterHoursDelivery: string;
  AfterHoursPickup: string;
  ArriveNoticeNotifyConsignee: string;
  AppointmentDelivery: string;
  AssemblyFlag: string;
  ConventionCenterDelivery: string;
  ConventionCenterPickup: string;
  InBondFreight: string;
  CrossDockAtDestination: string;
  CrossDockAtOrigin: string;
  DriverAssist: string;
  InsideDelivery: string;
  InsidePickup: string;
  ExclusiveUseOfTrailer: string;
  FlatbedAtDelivery: string;
  FlatbedAtPickup: string;
  ForkliftAtDestination: string;
  ForkliftAtOrigin: string;
  FinalMileInsidePickup: string;
  FinalMilePickupWithDisassemble: string;
  FinalMileInsidePickupAndPackaging: string;
  Lumper: string;
  GuaranteedDeliveryAsAdvertisedTransit: string;
  GuaranteedDeliveryExpeditedTransit: string;
  PalletRemoval: string;
  ProtectFromFreeze: string;
  RoomOfChoiceDelivery: string;
  SecureShipmentDivider: string;
  SortSegregate: string;
  TwoManDelivery: string;
  TimeCriticalDeliveryBetween: string;
  TimeCriticalByNoon: string;
  TimeCriticalAMDelivery: string;
  TimeCriticalPMDelivery: string;
  ThresholdDelivery: string;
  ThresholdPickup: string;
  WhiteGloveDelivery: string;
  DeliveryByDateFlag: string;
  DeliveryOnDateFlag: string;
  DeliveryBetweenSpecificDatesFlag: string;
  DeliveryAtSpecificTimeOfDayFlag: string;
  DeliveryByDate: string;
  DeliveryOnDate: string;
  DeliveryBetweenSpecificDatesFrom: string;
  DeliveryBetweenSpecificDatesTo: string;
  DeliveryAtSpecificTimeOfDay: string;
  PrintOrder: string;
  HasEnclosedReturnLabel: string;
  EnclosedReturnInsuranceCharges: string;
  EnclosedReturnAdditionalHandling: string;
  FedExFreightDirect: string;
  DroppointDelivery: string;
  ParcelRouting: string;
  ShippingCharges: string;
  AccountId: string;
  ShipViaQuoteId: string;
  ReadyTimeType: string;
  ReadyTimeAdvanceMinutes: string;
  InsuranceRate: string;
  ClearPathRate: string;
  CarrierRate: string;
  InsuranceCharges: string;
  FreightCharges: string;
  OtherCharges: string;
  TotalCharges: string;
  BaseCharges: string;
  FuelSurcharge: string;
  ResidentialSurcharge: string;
  ShipmentNumber: string;
  TotalWeight: string;
  UPSServiceType: string;
  ChargeTypeSetBy: string;
  ChargeType: string;
  CurrencyCode: string;
  Residential: string;
  DocInd: string;
  FDXSPIndicia: string;
  FDXSPAncillaryEndorsement: string;
  ManifestStatus: string;
  ShipDate: string;
  HomeDeliveryTime: string;
  HazMatIndicator: string;
  FDXHomeDeliverySignReq: string;
  Carrier: string;
  LatestPickupTime: string;
  ReadyTime: string;
  TimeZoneIdSetBy: string;
  PickupDate: string;
  CargoAircraftOnly: string;
  ThirdPartyConsignee: string;
  Package: Package[];
  Shipper3PartyBillingAddress: Shipper3PartyBillingAddress;
  DeliveryAddress: DeliveryAddress;
  ShipperAddress: ShipperAddress;
  HALAddress: string;
  IsAccessPointShipment: string;
  DirectDeliveryOnly: string;
  IsShipRushDesktopShipment: string;
  ShipmentId: string;
  ShipmentStatus: string;
  ShipmentType: string;
  CESFlag: string;
  ITARFlag: string;
  ReturnsClearanceFlag: string;
  AlcoholRecipient: string;
  FreightRole: string;
  FreightCollectTerms: string;
  FreightDeclaredValuePerUnitAmount: string;
  FreightDeclaredValuePerUnitCurrency: string;
  FreightDeclaredValueUnits: string;
  FreightTotalHandlingUnits: string;
  FreightClientDiscountPercent: string;
  FreightPalletWeight: string;
  FreightSizeL: string;
  FreightSizeW: string;
  FreightSizeH: string;
  FreightCoverageType: string;
  FreightCoverageAmount: string;
  FreightCoverageCurrency: string;
  ItemFreightClass: string;
  DomesticFreightClass: string;
  ItemClassProvidedByCustomer: string;
  ItemHandlingUnits: string;
  ItemPackaging: string;
  ItemPieces: string;
  ItemWeight: string;
  ItemSizeL: string;
  ItemSizeW: string;
  ItemSizeH: string;
}

export interface Documents {
  PaperDocument: PaperDocument[];
}

export interface PaperDocument {
  PaperDocumentId: string;
  DocumentType: string;
  LabelFormat: string;
  Title: string;
  Width: string;
  Height: string;
  DPI: string;
  ContentMimeEncoded: string;
  PrintOrder: string;
}

export interface ShippingAccount {
  ShippingAccountId: string;
  CarrierType: string;
  IsSandbox: string;
  Status: string;
  AccountRates: string;
  AccountMode: string;
  CreatedAt: string;
  IsDeleted: string;
  AccountNumber: string;
  Username: string;
  HiddenPostage: string;
  PostageBalance: string;
  DefaultShipFromAddress: DefaultShipFromAddress;
  PostageBalanceCurrency: string;
  IsTotalShippingProtectionEnabled: string;
}

export interface DefaultShipFromAddress {
  FirstName: string;
  LastName: string;
  Company: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  StateOrEmpty: string;
  Country: string;
  StateAsString: string;
  CountryAsString: string;
  PostalCode: string;
  Phone: string;
  EMail: string;
}

export interface Package {
  DangerousGoodsType: string;
  FreightServiceType: string;
  FreightEquipmentType: string;
  FreightInsuranceCategory: string;
  InsuranceIncludingFreightCharge: string;
  PackageHandling: string;
  LithiumBatteries: string;
  GoodsValue: string;
  InsuranceProvider: string;
  InsuranceCarrier: string;
  PackageMerged: string;
  NumberOfUnits: string;
  PackageTrackingNumber: string;
  PackageSequenceNumber: string;
  PackageActualWeight: string;
  PackagingType: string;
  PkgLength?: string;
  PkgWidth?: string;
  PkgHeight?: string;
  AdditionalHandling: string;
  InsuranceType: string;
  InsuranceCharges: string;
  VerbalConfInd: string;
  ShippingCharges: string;
  CarrierRate: string;
  FDXPriorityAlert: string;
  NonStandardContainerFlag: string;
  ContainsBattery: string;
  InsuranceExternalId?: string;
  InsuranceQuotePackageId?: string;
  InsuranceAmount?: string;
  InsuranceCurrency?: string;
}

export interface Shipper3PartyBillingAddress {
  Address: Address;
}

export interface Address {
  StateOrEmpty: string;
  Country: string;
  StateAsString: string;
  CountryAsString: string;
}

export interface DeliveryAddress {
  Address: Address2;
}

export interface Address2 {
  FirstName: string;
  LastName: string;
  Company: string;
  Address1: string;
  City: string;
  State: string;
  StateOrEmpty: string;
  Country: string;
  StateAsString: string;
  CountryAsString: string;
  PostalCode: string;
  Phone: string;
}

export interface ShipperAddress {
  UPSAccountNumber: string;
  Address: Address3;
}

export interface Address3 {
  FirstName: string;
  LastName: string;
  Company: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  StateOrEmpty: string;
  Country: string;
  StateAsString: string;
  CountryAsString: string;
  PostalCode: string;
  Phone: string;
}

export interface ShipmentClientRes {
  isSuccess: string;
  ShipmentNumber: string;
  ShipmentId: string;
  messages: ShipmentClientMsgRes[];
  printLables: ShipmentClientprintlablesRes[] | ShipmentClientprintlablesRes;
}

export interface ShipmentClientMsgRes {
  Severity: string;
  textMessage: string;
}
export interface ShipmentClientprintlablesRes {
  dataLabel: string;
}

// export const shipRushRes = `<ShipResponse xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//     <Messages>
//         <ShippingMessage>
//             <Severity>info</Severity>
//             <Text>Address lines were modified by Automatic address validation</Text>
//         </ShippingMessage>
//         <ShippingMessage>
//             <Severity>INFO</Severity>
//             <Text>Test shipment '880427630418' was automatically voided</Text>
//         </ShippingMessage>
//     </Messages>
//     <IsSuccess>true</IsSuccess>
//     <ShipTransaction>
//         <Shipment>
//             <UnitsOfMeasureLinear>IN</UnitsOfMeasureLinear>
//             <PostbackContentType>Unknown</PostbackContentType>
//             <Documents>
//                 <PaperDocument>
//                     <PaperDocumentId>0d543a40-59a1-404a-af19-b2ba00f05418</PaperDocumentId>
//                     <DocumentType>ShippingLabel</DocumentType>
//                     <LabelFormat>PNG</LabelFormat>
//                     <Title>FedEx Shipping Label</Title>
//                     <Width>800</Width>
//                     <Height>1200</Height>
//                     <DPI>0</DPI>
//                     <ContentMimeEncoded>iVBORw0KGgoAA==</ContentMimeEncoded>
//                     <PrintOrder>0</PrintOrder>
//                 </PaperDocument>
//                 <PaperDocument>
//                     <PaperDocumentId>621f09a2-cdd5-46b3-8c55-b2ba00f0541d</PaperDocumentId>
//                     <DocumentType>ShippingLabel</DocumentType>
//                     <LabelFormat>PNG</LabelFormat>
//                     <Title>FedEx Shipping Label</Title>
//                     <Width>800</Width>
//                     <Height>1200</Height>
//                     <DPI>0</DPI>
//                     <ContentMimeEncoded>iVBORw0KGg==</ContentMimeEncoded>
//                     <PrintOrder>0</PrintOrder>
//                 </PaperDocument>
//             </Documents>
//             <ShippingAccount>
//                 <ShippingAccountId>a7980fa2-4623-4a70-ada5-b074006fd3f1</ShippingAccountId>
//                 <CarrierType>1</CarrierType>
//                 <IsSandbox>false</IsSandbox>
//                 <Status>Activated</Status>
//                 <AccountRates>NegotiatedRates</AccountRates>
//                 <AccountMode>Unknown</AccountMode>
//                 <CreatedAt>2023-09-05T06:47:09</CreatedAt>
//                 <IsDeleted>false</IsDeleted>
//                 <AccountNumber>324443053</AccountNumber>
//                 <Username></Username>
//                 <HiddenPostage>false</HiddenPostage>
//                 <PostageBalance>0</PostageBalance>
//                 <DefaultShipFromAddress>
//                     <FirstName>Danny</FirstName>
//                     <LastName>Spiegel</LastName>
//                     <Company>Compulocks Brands Inc.</Company>
//                     <Address1>9115 Dice Road Unit #18</Address1>
//                     <Address2></Address2>
//                     <City>Santa Fe Springs</City>
//                     <State>CA</State>
//                     <StateOrEmpty>CA</StateOrEmpty>
//                     <Country>US</Country>
//                     <StateAsString>CA</StateAsString>
//                     <CountryAsString>US</CountryAsString>
//                     <PostalCode>90670</PostalCode>
//                     <Phone>5626009721</Phone>
//                     <EMail>tobe@Compulocks.com</EMail>
//                 </DefaultShipFromAddress>
//                 <PostageBalanceCurrency>USD</PostageBalanceCurrency>
//                 <IsTotalShippingProtectionEnabled>true</IsTotalShippingProtectionEnabled>
//             </ShippingAccount>
//             <IsTest>1</IsTest>
//             <LiftgatePickup>false</LiftgatePickup>
//             <LiftgateDelivery>false</LiftgateDelivery>
//             <TradeshowPickup>false</TradeshowPickup>
//             <TradeshowDelivery>false</TradeshowDelivery>
//             <ConstructionSitePickup>false</ConstructionSitePickup>
//             <ConstructionSiteDelivery>false</ConstructionSiteDelivery>
//             <LimitedAccessPickup>false</LimitedAccessPickup>
//             <LimitedAccessPickupType>Unknown</LimitedAccessPickupType>
//             <LimitedAccessDelivery>false</LimitedAccessDelivery>
//             <LimitedAccessDeliveryType>Unknown</LimitedAccessDeliveryType>
//             <NotifyBeforeDelivery>false</NotifyBeforeDelivery>
//             <Tags>API_LABEL</Tags>
//             <ShipDateOnLabel>2025-04-09T00:00:00.0000000</ShipDateOnLabel>
//             <UseServiceAsString>false</UseServiceAsString>
//             <IsWebShippingApiRequest>true</IsWebShippingApiRequest>
//             <ChargeAmountSpecified>false</ChargeAmountSpecified>
//             <TimeInTransitDays>0</TimeInTransitDays>
//             <TimeInTransitBusinessDays>0</TimeInTransitBusinessDays>
//             <ShippedByEmail>tobe@Compulocks.com</ShippedByEmail>
//             <ConsolidationSource>Unknown</ConsolidationSource>
//             <ConsolidationRouting>Unknown</ConsolidationRouting>
//             <ConsolidationType>Unknown</ConsolidationType>
//             <ConsolidationReferenceType>Unknown</ConsolidationReferenceType>
//             <ConsolidationDistributionLocationType>Unknown</ConsolidationDistributionLocationType>
//             <ConsolidationField>Unknown</ConsolidationField>
//             <PartiesToTransactionAreRelated>false</PartiesToTransactionAreRelated>
//             <IsUPSNextDayAirDetected>false</IsUPSNextDayAirDetected>
//             <ServiceTypeSetBy>Unknown</ServiceTypeSetBy>
//             <CustomerReference>so202501234</CustomerReference>
//             <HasTenderedNotification>0</HasTenderedNotification>
//             <UseShipRushTrackingPage>false</UseShipRushTrackingPage>
//             <CarbonNeutral>0</CarbonNeutral>
//             <RequestPickup>false</RequestPickup>
//             <UseAlternativeTrackingNumber>true</UseAlternativeTrackingNumber>
//             <PickupByTime>2025-04-09T14:34:00.000Z</PickupByTime>
//             <PickupReadyTime>2025-04-09T14:34:00.000Z</PickupReadyTime>
//             <EstimatedDeliveryDate>4/10/2025 12:00:00 AM</EstimatedDeliveryDate>
//             <PersonIdentityCheck>false</PersonIdentityCheck>
//             <PersonDateOfBirth>2000-01-01T00:00:00.000Z</PersonDateOfBirth>
//             <UsePreferredDeliveryDate>false</UsePreferredDeliveryDate>
//             <PreferredDeliveryDate>2000-01-01T00:00:00.000Z</PreferredDeliveryDate>
//             <AppointmentRequiredDelivery>false</AppointmentRequiredDelivery>
//             <AppointmentRequiredPickup>false</AppointmentRequiredPickup>
//             <Inbond>false</Inbond>
//             <ChainOfSignature>false</ChainOfSignature>
//             <ProtectiveService>false</ProtectiveService>
//             <TailgateDelivery>false</TailgateDelivery>
//             <TailgatePickup>false</TailgatePickup>
//             <Overlength>false</Overlength>
//             <HazardousMaterial>false</HazardousMaterial>
//             <PrivateResidencePickup>false</PrivateResidencePickup>
//             <PrivateResidenceDelivery>false</PrivateResidenceDelivery>
//             <JobsiteDelivery>false</JobsiteDelivery>
//             <JobsitePickup>false</JobsitePickup>
//             <AfterHoursDelivery>false</AfterHoursDelivery>
//             <AfterHoursPickup>false</AfterHoursPickup>
//             <ArriveNoticeNotifyConsignee>false</ArriveNoticeNotifyConsignee>
//             <AppointmentDelivery>false</AppointmentDelivery>
//             <AssemblyFlag>false</AssemblyFlag>
//             <ConventionCenterDelivery>false</ConventionCenterDelivery>
//             <ConventionCenterPickup>false</ConventionCenterPickup>
//             <InBondFreight>false</InBondFreight>
//             <CrossDockAtDestination>false</CrossDockAtDestination>
//             <CrossDockAtOrigin>false</CrossDockAtOrigin>
//             <DriverAssist>false</DriverAssist>
//             <InsideDelivery>false</InsideDelivery>
//             <InsidePickup>false</InsidePickup>
//             <ExclusiveUseOfTrailer>false</ExclusiveUseOfTrailer>
//             <FlatbedAtDelivery>false</FlatbedAtDelivery>
//             <FlatbedAtPickup>false</FlatbedAtPickup>
//             <ForkliftAtDestination>false</ForkliftAtDestination>
//             <ForkliftAtOrigin>false</ForkliftAtOrigin>
//             <FinalMileInsidePickup>false</FinalMileInsidePickup>
//             <FinalMilePickupWithDisassemble>false</FinalMilePickupWithDisassemble>
//             <FinalMileInsidePickupAndPackaging>false</FinalMileInsidePickupAndPackaging>
//             <Lumper>false</Lumper>
//             <GuaranteedDeliveryAsAdvertisedTransit>false</GuaranteedDeliveryAsAdvertisedTransit>
//             <GuaranteedDeliveryExpeditedTransit>false</GuaranteedDeliveryExpeditedTransit>
//             <PalletRemoval>false</PalletRemoval>
//             <ProtectFromFreeze>false</ProtectFromFreeze>
//             <RoomOfChoiceDelivery>false</RoomOfChoiceDelivery>
//             <SecureShipmentDivider>false</SecureShipmentDivider>
//             <SortSegregate>false</SortSegregate>
//             <TwoManDelivery>false</TwoManDelivery>
//             <TimeCriticalDeliveryBetween>false</TimeCriticalDeliveryBetween>
//             <TimeCriticalByNoon>false</TimeCriticalByNoon>
//             <TimeCriticalAMDelivery>false</TimeCriticalAMDelivery>
//             <TimeCriticalPMDelivery>false</TimeCriticalPMDelivery>
//             <ThresholdDelivery>false</ThresholdDelivery>
//             <ThresholdPickup>false</ThresholdPickup>
//             <WhiteGloveDelivery>false</WhiteGloveDelivery>
//             <DeliveryByDateFlag>false</DeliveryByDateFlag>
//             <DeliveryOnDateFlag>false</DeliveryOnDateFlag>
//             <DeliveryBetweenSpecificDatesFlag>false</DeliveryBetweenSpecificDatesFlag>
//             <DeliveryAtSpecificTimeOfDayFlag>false</DeliveryAtSpecificTimeOfDayFlag>
//             <DeliveryByDate>2025-04-09T00:00:00.000Z</DeliveryByDate>
//             <DeliveryOnDate>2025-04-09T00:00:00.000Z</DeliveryOnDate>
//             <DeliveryBetweenSpecificDatesFrom>2025-04-09T00:00:00.000Z</DeliveryBetweenSpecificDatesFrom>
//             <DeliveryBetweenSpecificDatesTo>2025-04-09T00:00:00.000Z</DeliveryBetweenSpecificDatesTo>
//             <DeliveryAtSpecificTimeOfDay>2025-04-09T14:34:00.000Z</DeliveryAtSpecificTimeOfDay>
//             <PrintOrder>0</PrintOrder>
//             <HasEnclosedReturnLabel>false</HasEnclosedReturnLabel>
//             <EnclosedReturnInsuranceCharges>0</EnclosedReturnInsuranceCharges>
//             <EnclosedReturnAdditionalHandling>false</EnclosedReturnAdditionalHandling>
//             <FedExFreightDirect>Unknown</FedExFreightDirect>
//             <DroppointDelivery>false</DroppointDelivery>
//             <ParcelRouting>false</ParcelRouting>
//             <ShippingCharges>26.48</ShippingCharges>
//             <AccountId>d0f81925-49f2-4a83-bf47-b05f00ef5e5d</AccountId>
//             <ShipViaQuoteId>false</ShipViaQuoteId>
//             <ReadyTimeType>Unknown</ReadyTimeType>
//             <ReadyTimeAdvanceMinutes>0</ReadyTimeAdvanceMinutes>
//             <InsuranceRate>0.94</InsuranceRate>
//             <ClearPathRate>0</ClearPathRate>
//             <CarrierRate>25.54</CarrierRate>
//             <InsuranceCharges>0</InsuranceCharges>
//             <FreightCharges>0</FreightCharges>
//             <OtherCharges>0</OtherCharges>
//             <TotalCharges>26.48</TotalCharges>
//             <BaseCharges>23.4</BaseCharges>
//             <FuelSurcharge>3.9</FuelSurcharge>
//             <ResidentialSurcharge>0</ResidentialSurcharge>
//             <ShipmentNumber>880427630418</ShipmentNumber>
//             <TotalWeight>3</TotalWeight>
//             <UPSServiceType>F92</UPSServiceType>
//             <ChargeTypeSetBy>Unknown</ChargeTypeSetBy>
//             <ChargeType>PRE</ChargeType>
//             <CurrencyCode>USD</CurrencyCode>
//             <Residential>0</Residential>
//             <DocInd>3</DocInd>
//             <FDXSPIndicia>0</FDXSPIndicia>
//             <FDXSPAncillaryEndorsement>0</FDXSPAncillaryEndorsement>
//             <ManifestStatus>Unknown</ManifestStatus>
//             <ShipDate>2025-04-09T14:35:00.000Z</ShipDate>
//             <HomeDeliveryTime>0</HomeDeliveryTime>
//             <HazMatIndicator>Unknown</HazMatIndicator>
//             <FDXHomeDeliverySignReq>0</FDXHomeDeliverySignReq>
//             <Carrier>1</Carrier>
//             <LatestPickupTime>2025-04-09T14:34:00.000Z</LatestPickupTime>
//             <ReadyTime>2025-04-09T14:34:00.000Z</ReadyTime>
//             <TimeZoneIdSetBy>Unknown</TimeZoneIdSetBy>
//             <PickupDate>2025-04-09T00:00:00.000Z</PickupDate>
//             <CargoAircraftOnly>0</CargoAircraftOnly>
//             <ThirdPartyConsignee>0</ThirdPartyConsignee>
//             <Package>
//                 <DangerousGoodsType>0</DangerousGoodsType>
//                 <FreightServiceType>Unknown</FreightServiceType>
//                 <FreightEquipmentType>Unknown</FreightEquipmentType>
//                 <FreightInsuranceCategory>Unknown</FreightInsuranceCategory>
//                 <InsuranceIncludingFreightCharge>false</InsuranceIncludingFreightCharge>
//                 <PackageHandling>None</PackageHandling>
//                 <LithiumBatteries>false</LithiumBatteries>
//                 <GoodsValue>0</GoodsValue>
//                 <InsuranceProvider>Unknown</InsuranceProvider>
//                 <InsuranceCarrier>Unknown</InsuranceCarrier>
//                 <PackageMerged>false</PackageMerged>
//                 <NumberOfUnits>0</NumberOfUnits>
//                 <PackageTrackingNumber>880427630418</PackageTrackingNumber>
//                 <PackageSequenceNumber>1</PackageSequenceNumber>
//                 <PackageActualWeight>1</PackageActualWeight>
//                 <PackagingType>02</PackagingType>
//                 <PkgLength>1.1</PkgLength>
//                 <PkgWidth>1.1</PkgWidth>
//                 <PkgHeight>1.1</PkgHeight>
//                 <AdditionalHandling>0</AdditionalHandling>
//                 <InsuranceType>Unknown</InsuranceType>
//                 <InsuranceCharges>0</InsuranceCharges>
//                 <VerbalConfInd>0</VerbalConfInd>
//                 <ShippingCharges>12.77</ShippingCharges>
//                 <CarrierRate>12.77</CarrierRate>
//                 <FDXPriorityAlert>0</FDXPriorityAlert>
//                 <NonStandardContainerFlag>0</NonStandardContainerFlag>
//                 <ContainsBattery>0</ContainsBattery>
//             </Package>
//             <Package>
//                 <DangerousGoodsType>0</DangerousGoodsType>
//                 <FreightServiceType>Unknown</FreightServiceType>
//                 <FreightEquipmentType>Unknown</FreightEquipmentType>
//                 <FreightInsuranceCategory>Unknown</FreightInsuranceCategory>
//                 <InsuranceIncludingFreightCharge>false</InsuranceIncludingFreightCharge>
//                 <PackageHandling>None</PackageHandling>
//                 <LithiumBatteries>false</LithiumBatteries>
//                 <GoodsValue>0</GoodsValue>
//                 <InsuranceExternalId>L9TVF-R3Y67-INS</InsuranceExternalId>
//                 <InsuranceQuotePackageId>596d277e-9781-4c3e-a993-24f97d934281</InsuranceQuotePackageId>
//                 <InsuranceProvider>Shipsurance</InsuranceProvider>
//                 <InsuranceCarrier>CoverGenius</InsuranceCarrier>
//                 <PackageMerged>false</PackageMerged>
//                 <NumberOfUnits>0</NumberOfUnits>
//                 <PackageTrackingNumber>880427631344</PackageTrackingNumber>
//                 <PackageSequenceNumber>1</PackageSequenceNumber>
//                 <PackageActualWeight>2</PackageActualWeight>
//                 <PackagingType>02</PackagingType>
//                 <AdditionalHandling>0</AdditionalHandling>
//                 <InsuranceType>Unknown</InsuranceType>
//                 <InsuranceAmount>50</InsuranceAmount>
//                 <InsuranceCurrency>USD</InsuranceCurrency>
//                 <InsuranceCharges>94</InsuranceCharges>
//                 <VerbalConfInd>0</VerbalConfInd>
//                 <ShippingCharges>13.71</ShippingCharges>
//                 <CarrierRate>12.77</CarrierRate>
//                 <FDXPriorityAlert>0</FDXPriorityAlert>
//                 <NonStandardContainerFlag>0</NonStandardContainerFlag>
//                 <ContainsBattery>0</ContainsBattery>
//             </Package>
//             <Shipper3PartyBillingAddress>
//                 <Address>
//                     <StateOrEmpty></StateOrEmpty>
//                     <Country>US</Country>
//                     <StateAsString>Unknown</StateAsString>
//                     <CountryAsString>US</CountryAsString>
//                 </Address>
//             </Shipper3PartyBillingAddress>
//             <DeliveryAddress>
//                 <Address>
//                     <FirstName>TEST</FirstName>
//                     <LastName>SHIPMENT</LastName>
//                     <Company>TEST SHIPMENT - DO NOT USE</Company>
//                     <Address1>120 LAKESIDE AVE SUITE 101</Address1>
//                     <City>SEATTLE</City>
//                     <State>WA</State>
//                     <StateOrEmpty>WA</StateOrEmpty>
//                     <Country>US</Country>
//                     <StateAsString>WA</StateAsString>
//                     <CountryAsString>US</CountryAsString>
//                     <PostalCode>98122-6548</PostalCode>
//                     <Phone>206-300-0000</Phone>
//                 </Address>
//             </DeliveryAddress>
//             <ShipperAddress>
//                 <UPSAccountNumber>324443053</UPSAccountNumber>
//                 <Address>
//                     <FirstName>Mark</FirstName>
//                     <LastName>White</LastName>
//                     <Company>Cat Food Unlimited</Company>
//                     <Address1>3000 Landerholm Cir SE</Address1>
//                     <Address2></Address2>
//                     <City>Bellevue</City>
//                     <State>WA</State>
//                     <StateOrEmpty>WA</StateOrEmpty>
//                     <Country>US</Country>
//                     <StateAsString>WA</StateAsString>
//                     <CountryAsString>US</CountryAsString>
//                     <PostalCode>98007</PostalCode>
//                     <Phone>206-400-0000</Phone>
//                 </Address>
//             </ShipperAddress>
//             <HALAddress></HALAddress>
//             <IsAccessPointShipment>0</IsAccessPointShipment>
//             <DirectDeliveryOnly>0</DirectDeliveryOnly>
//             <IsShipRushDesktopShipment>0</IsShipRushDesktopShipment>
//             <ShipmentId>f4782797-e85f-434b-9ee0-b2ba00f04f54</ShipmentId>
//             <ShipmentStatus>Unknown</ShipmentStatus>
//             <ShipmentType>History</ShipmentType>
//             <CESFlag>0</CESFlag>
//             <ITARFlag>0</ITARFlag>
//             <ReturnsClearanceFlag>0</ReturnsClearanceFlag>
//             <AlcoholRecipient>0</AlcoholRecipient>
//             <FreightRole>SHIPPER</FreightRole>
//             <FreightCollectTerms>Unknown</FreightCollectTerms>
//             <FreightDeclaredValuePerUnitAmount>0</FreightDeclaredValuePerUnitAmount>
//             <FreightDeclaredValuePerUnitCurrency>USD</FreightDeclaredValuePerUnitCurrency>
//             <FreightDeclaredValueUnits>0</FreightDeclaredValueUnits>
//             <FreightTotalHandlingUnits>0</FreightTotalHandlingUnits>
//             <FreightClientDiscountPercent>0</FreightClientDiscountPercent>
//             <FreightPalletWeight>1</FreightPalletWeight>
//             <FreightSizeL>1.1</FreightSizeL>
//             <FreightSizeW>1.1</FreightSizeW>
//             <FreightSizeH>1.1</FreightSizeH>
//             <FreightCoverageType>Unknown</FreightCoverageType>
//             <FreightCoverageAmount>0</FreightCoverageAmount>
//             <FreightCoverageCurrency>USD</FreightCoverageCurrency>
//             <ItemFreightClass>Unknown</ItemFreightClass>
//             <DomesticFreightClass>Unknown</DomesticFreightClass>
//             <ItemClassProvidedByCustomer>false</ItemClassProvidedByCustomer>
//             <ItemHandlingUnits>0</ItemHandlingUnits>
//             <ItemPackaging>Unknown</ItemPackaging>
//             <ItemPieces>0</ItemPieces>
//             <ItemWeight>0</ItemWeight>
//             <ItemSizeL>0</ItemSizeL>
//             <ItemSizeW>0</ItemSizeW>
//             <ItemSizeH>0</ItemSizeH>
//         </Shipment>
//     </ShipTransaction>
//     <PostageBalance>0</PostageBalance>
//     <PostageBalanceCurrency>USD</PostageBalanceCurrency>
// </ShipResponse>`;
