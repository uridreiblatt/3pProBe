import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRoleDto {
    @ApiProperty()
    userId : number;
    @ApiProperty()
    roleId : number;    
}
