import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductStatusDto {
     @ApiProperty()  
     @IsString()
     companyId: string;
}
