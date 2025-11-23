import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateTaskGrvDto {
  @ApiProperty()
  @IsString()
  DataInfo: string;
  // @ApiProperty()
  // @IsString()
  // PO: string;
  // @ApiProperty()
  // @IsString()
  // Location: string;
  // @ApiProperty()
  // @IsString()
  // Supplier: string;
  @ApiProperty()
  @IsString()
  PartNumber: string;
  
  @ApiProperty()
  @IsInt()
  NoOfBoxes: number;
  @ApiProperty()
  @IsInt()
  NoOfItems: number;
  @ApiProperty()
  @IsInt()
  NoOfBoxes_1: number;
  @IsInt()
  @ApiProperty()
  NoOfItems_1: number;
  @ApiProperty()
  @IsInt()
  NoOfBoxes_2: number;
  @ApiProperty()
  @IsInt()
  NoOfItems_2: number;
  @ApiProperty()
  @IsInt()
  NoOfBoxes_3: number;
  @ApiProperty()
  @IsInt()
  NoOfItems_3: number;
  @ApiProperty()
  @IsInt()
  NoOfBoxes_4: number;
  @ApiProperty()
  @IsInt()
  NoOfItems_4: number;
  @ApiProperty()
  @IsInt()
  NoOfBoxes_5: number;
  @ApiProperty()
  @IsInt()
  NoOfItems_5: number;
  @ApiProperty()
  @IsInt()
  bulkQauntity: number;
  @ApiProperty()
  @IsInt()
  Total: number;
  @ApiProperty()
  @IsString()
  taskUserId: string;
}
