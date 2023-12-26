import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    @Length(3, 15)
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @Length(3, 15)
    @ApiProperty()
    readonly jobTitle: string;

    @IsNotEmpty()
    @Length(3, 15)
    @ApiProperty()
    readonly department: string;
}


