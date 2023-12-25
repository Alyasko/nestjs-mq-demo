import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly jobTitle: string;
    @ApiProperty()
    readonly department: string;
}


