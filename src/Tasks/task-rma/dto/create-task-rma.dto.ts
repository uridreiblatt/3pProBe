import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateTaskRmaDto {
  @ApiProperty()
  @IsString()
  rmaNumber: string;
  @ApiProperty()
  @IsString()
  trackingNumber: string;
  @ApiProperty()
  @IsInt()
  statusRma: number;
  @ApiProperty()
  @IsString()
  customerName: string;
  @ApiProperty()
  @IsString()
  PartNumber: string;
  @ApiProperty()
  @IsInt()
  partQount: number;
  @ApiProperty()
  @IsBoolean()
  backToInventory: boolean;
  @ApiProperty()
  @IsBoolean()
  productStatus: boolean;
  @ApiProperty()
  @IsString()
  cylinder: string;
  @ApiProperty()
  @IsString()
  remarks: string;
  @ApiProperty()
  @IsInt()
  taskUserId: string;
}
