import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateTaskUserDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  taskTypeId: number;
  @ApiProperty({ default: "DataInfo" })
  @IsString()
  DataInfo: string;
  @ApiProperty()
  @IsString()
  PartNumber: string;
  @ApiProperty({ default: 0 })
  @IsInt()
  QTYtoassemble: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  QTYassembled: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  Total: number;
  @ApiProperty()
  @IsString()
  BIN: string;
  @ApiProperty()
  @IsInt()
  QTY: number;
  @ApiProperty()
  @IsString()
  BIN_1: string;
  @ApiProperty()
  @IsInt()
  QTY_1: number;
  @ApiProperty()
  @IsString()
  BIN_2: string;
  @ApiProperty()
  @IsInt()
  QTY_2: number;
  @ApiProperty()
  @IsString()
  Supplier: string;
  @ApiProperty()
  @IsString()
  PalletNumber: string;
  @ApiProperty()
  @IsString()
  PO: string;
  @ApiProperty()
  @IsString()
  Location: string;
  @ApiProperty()
  @IsString()
  taskInfo: string;
  @ApiProperty({ default: 0 })
  @IsInt()
  NoOfBoxes: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  NoOfItems: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  bulkQauntity: number;
  @ApiProperty()
  @IsString()
  Color: string;
  @ApiProperty()
  @IsString()
  orderName: string;
  @ApiProperty({ default: 1 })
  @IsInt()
  userId: string;
  @ApiProperty({ default: 1 })
  @IsInt()
  taskStatusId: number;
  @ApiProperty({ default: 0 })
  @IsString()
  orderid: string;
  @ApiProperty({ default: 0 })
  @IsString()
  orderlineId: string;
  @ApiProperty({ default: 0 })
  @IsInt()
  taskPriority: number;
  @ApiProperty()
  @IsString()
  rmaNumber: string;
  @ApiProperty()
  @IsString()
  trackingNumber: string;
  @ApiProperty()
  @IsString()
  pictureOne: string;
  @ApiProperty()
  @IsString()
  pictureTwo: string;
  @ApiProperty()
  @IsInt()
  statusRma: number;
  @ApiProperty()
  @IsString()
  customerName: string;
  @ApiProperty()
  @IsString()
  cylinder: string;
  @ApiProperty()
  @IsInt()
  backToInventory: number;
  @ApiProperty({ default: "1" })
  @IsString()
  companyId: string; // required if you expect it in the body
}

export interface RootPoPriority {
  "@odata.context": string;
  value: Value[];
}
export interface Value {
  SUPNAME: string;
  CDES: string;
  ORDNAME: string;
  DETAILS: string;
  PORDERITEMS: PORDERITEMSLines[];
}

export interface PORDERITEMSLines {
  PARTNAME: string;
  CDES: string;
  PDES: string;
  TQUANT: string;
}




