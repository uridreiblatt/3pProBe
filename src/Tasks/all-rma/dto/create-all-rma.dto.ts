import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateAllRmaDto {
    @ApiProperty()    
    @IsString()
          DataInfo: string;
          @ApiProperty() 
          @IsString()
          Title: string;
          @ApiProperty() 
          @IsString()
          PO: string;
          @ApiProperty()   
          @IsString()        
          userId: string;
           @ApiProperty()   
           @IsInt()           
          taskStatusId: number;
          @ApiProperty() 
          @IsString()
          orderId: string;
          @ApiProperty() 
          @IsString()
          orderlineId: string;
          @ApiProperty() 
          @IsInt()
          taskPriority: number;
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
          cylinder: string;
          @ApiProperty() 
          @IsInt()
          backToInventory: number;
          @ApiProperty() 
          @IsString()
          companyId: string;
}
