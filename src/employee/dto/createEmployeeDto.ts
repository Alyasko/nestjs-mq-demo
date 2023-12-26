import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    readonly jobTitle: string;

    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty()
    readonly department: string;
}


