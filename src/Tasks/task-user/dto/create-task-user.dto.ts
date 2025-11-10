import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskUserDto {
  @ApiProperty({ default: 1 })
  taskTypeId: number;
  @ApiProperty({ default: 'DataInfo' })
  DataInfo: string;
  @ApiProperty()
  PartNumber: string;
  @ApiProperty({ default: 0 })
  QTYtoassemble: number;
  @ApiProperty({ default: 0 })
  QTYassembled: number;
  @ApiProperty({ default: 0 })
  Total: number;
  @ApiProperty()
  BIN: string;
  @ApiProperty()
  QTY: number;
  @ApiProperty()
  BIN_1: string;
  @ApiProperty()
  QTY_1: number;
  @ApiProperty()
  BIN_2: string;
  @ApiProperty()
  QTY_2: number;
  @ApiProperty()
  Supplier: string;
  @ApiProperty()
  PalletNumber: string;
  @ApiProperty()
  PO: string;
  @ApiProperty()
  Location: string;
  @ApiProperty()
  taskInfo: string;
  @ApiProperty({ default: 0 })
  NoOfBoxes: number;
  @ApiProperty({ default: 0 })
  NoOfItems: number;
  @ApiProperty({ default: 0 })
  bulkQauntity: number;
  @ApiProperty()
  Color: string;
  @ApiProperty({ default: 1 })
  userId: number;
  @ApiProperty({ default: 1 })
  taskStatusId: number;
  @ApiProperty({ default: 0 })
  orderid: string;
  @ApiProperty({ default: 0 })
  orderlineId: string;
  @ApiProperty({ default: 0 })
  taskPriority: number;
  @ApiProperty()
  rmaNumber: string;
  @ApiProperty()
  trackingNumber: string;
  @ApiProperty()
  pictureOne: string;
  @ApiProperty()
  pictureTwo: string;
  @ApiProperty()
  statusRma: number;
  @ApiProperty()
  customerName: string;
  @ApiProperty()
  cylinder: string;
  @ApiProperty()
  backToInventory: number;
}
