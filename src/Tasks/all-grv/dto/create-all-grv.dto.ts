
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAllGrvDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  taskTypeId: number;
  @ApiProperty({ default: "DataInfo" })
  @IsString()
  DataInfo: string;
  @ApiProperty()
  @IsString()
  PartNumber: string;
  @ApiProperty()
  @IsString()
  productName: string;


  @ApiProperty()
  @IsString()
  productDescription: string;

  @ApiProperty({ default: 0 })
  @IsInt()
  QTYtoassemble: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  QTYassembled: number;
  @ApiProperty()
  @IsString()
  Location: string;
  @ApiProperty()
  @IsString()
  taskInfo: string;

  @ApiProperty()
  @IsString()
  remarks: string;

  @ApiProperty({ default: "aaa-bbb-ccc" })
  @IsString()
  userId: string;
  @ApiProperty({ default: 1 })
  @IsInt()
  taskStatusId: number;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsInt()
  taskPriority: number;

  @ApiProperty()
  @IsString()
  cylinder: string;

  @ApiProperty()
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
  CURDATE: string;
  PORDERITEMS_SUBFORM: PORDERITEMSLines[];
}

export interface PORDERITEMSLines {
  PARTNAME: string;
  //CDES: string;
  PDES: string;
  TQUANT: string;
  BARCODE: string;
}

