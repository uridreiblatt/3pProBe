import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateOrderBoxItemDto {
  @ApiProperty()
  @IsString()
  partNumber: string;
  @ApiProperty()
  @IsString()
  productName: string;
  @ApiProperty()
  @IsString()
  productDescription: string;
  @ApiProperty()
  @IsNumber()
  itemsCount: number;
  @ApiProperty()
  @IsString()
  orderBoxesId : string;
  @ApiProperty()
  @IsString() 
  orderId: string;
}
