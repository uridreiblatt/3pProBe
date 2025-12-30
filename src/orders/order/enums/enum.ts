export enum EOrderRole {
  Picker = 1,
  Packer = 2,
  QC = 3,
  Shipper = 4,
  BackOffice = 5,
   Administrator = 6,
    SysAdmin = 7,
}


// export enum EOrderStatus {
//   New = 1,
//   InProgress = 2,
//   Complete = 5,
//   Pending = 6,
// }
export enum OrderStatusEnum {
  New = 1,
  InProgres = 2,
  Complete = 3,
  Pending = 4,
  AssistantPending = 5,
  AssistantComplete = 6,
  Review = 7,


}

export enum EOrderUser {
  unAssigned = 'aaa-bbb-ccc',
}
