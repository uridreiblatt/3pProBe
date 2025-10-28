import { ApiProperty } from '@nestjs/swagger';
import { OrderBoxes } from 'src/order-boxes/entities/order-box.entity';
import { OrderLine } from 'src/order-lines/entities/order-line.entity';
import { TaskStatus } from 'src/task-status/entities/task-status.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
  @ApiProperty({ default: 'CUSTNAME' })
  CUSTNAME: string;
  @ApiProperty({ default: 'CUSTNO' })
  CUSTNO: string;
  @ApiProperty({ default: 'ORDNAME' })
  ORDNAME: string;
  @ApiProperty({ default: 'STCODE' })
  STCODE: string;
  @ApiProperty({ default: null })
  CURDATE: string;
  @ApiProperty({ default: 'ADDRESS' })
  ADDRESS: string;
  @ApiProperty({ default: 'ADDRESS2' })
  ADDRESS2: string;
  @ApiProperty({ default: 'ADDRESS3' })
  ADDRESS3: string;
  @ApiProperty({ default: 'STATE' })
  STATE: string;
  @ApiProperty({ default: 'STATECODE' })
  STATECODE: string;
  @ApiProperty({ default: 'STATENAME' })
  STATENAME: string;
  @ApiProperty({ default: '' })
  ZIP: string;
  @ApiProperty({ default: '' })
  DETAILS: string;
  @ApiProperty({ default: 'COUNTRYNAME' })
  COUNTRYNAME: string;
  @ApiProperty({ default: 'orderRemarks' })
  orderRemarks: string;
  @ApiProperty({ default: '' })
  orderPhotoBase64: string;
  @ApiProperty({ default: '' })
  orderPhotoBase64_1: string;
  @ApiProperty({ default: '' })
  orderPhotoBase64_2: string;
  @ApiProperty({ default: 100 })
  priorityOrder: number;
  @ApiProperty({ default: 2 })
  shipmentOrder: number;
  @ApiProperty({})
  STDES: string;
  @ApiProperty({ default: false })
  Pallet: boolean;
  @ApiProperty({})
  ShData: string;
  @ApiProperty({})
  ordertext: string;
  @ApiProperty({ default: 1 })
  userId: number;
  @ApiProperty({ default: 1 })
  taskStatusId: number;
  @ApiProperty()
  orderLines: OrderLine[];
  @ApiProperty()
  orderBoxes: OrderBoxes[];
  @ApiProperty()
  taskStatus: TaskStatus;
  @ApiProperty()
  user: User;
  @ApiProperty()
  role: Role;
  @ApiProperty()
  orderNote: string;
  @ApiProperty()
  CUSTDES: string;
  @ApiProperty()
  NAME: string;
  @ApiProperty()
  PHONENUM: string;
  @ApiProperty()
  FAX: string;
  @ApiProperty()
  trackingNumber: string;
  @ApiProperty()
  shipRushStatus: string;
  @ApiProperty()
  shipRushDeliveryId: string;
  @ApiProperty()
  DOCUMENT_DOCNO: string;
  @ApiProperty()
  DOCUMENT_DOC: string;
  @ApiProperty()
  shipRushShipmentId: string;
  @ApiProperty()
  accountId: string;
  @ApiProperty()
  accountZip: string;
}
