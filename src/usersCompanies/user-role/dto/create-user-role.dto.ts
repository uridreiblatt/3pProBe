import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateUserRoleDto {
    @ApiProperty()
    @IsString()
    userId : string;
    @ApiProperty()
    @IsInt()
    roleId : number; 
    @ApiProperty()
    @IsString()
    companyId : string;
       
}
