import { Employee } from './model/employee';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/updateEmployeeDto';
import { EmployeeResponse } from './dto/EmployeeResponse';
import { ApiResponse } from '../common/apiResponse';
import { IdParamPipe } from '../common/idParamPipe';

// TODO: add error handling, input validation, implement storage, add swagger/api documentation

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    private transformToResponse(employee: Employee): EmployeeResponse {
        return <EmployeeResponse>{ id: employee.id, name: employee.name, jobTitle: employee.jobTitle, department: employee.department };
    }

    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto): ApiResponse<EmployeeResponse> {
        const employee = this.employeeService.create(createEmployeeDto);

        return <ApiResponse<EmployeeResponse>>{ isOk: true, data: this.transformToResponse(employee) };
    }

    @Put(':id')
    update(@Param('id', IdParamPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): ApiResponse<EmployeeResponse> {
        const employee = this.employeeService.update(id, updateEmployeeDto);
        if (employee === null)
            throw new HttpException("Unable to update employee.", HttpStatus.NOT_FOUND);

        return <ApiResponse<EmployeeResponse>>{ isOk: true, data: this.transformToResponse(employee) };
    }

    @Delete(':id')
    delete(@Param('id', IdParamPipe) id: string): ApiResponse {
        const isDeleted = this.employeeService.delete(id);
        if (!isDeleted)
            throw new HttpException("Unable to delete employee.", HttpStatus.NOT_FOUND);

        return <ApiResponse>{ isOk: true };
    }

    @Get(":id")
    get(@Param("id", IdParamPipe) id: string): ApiResponse<EmployeeResponse> {
        const employee = this.employeeService.get(id);
        if (employee === null)
            throw new HttpException("Unable to get employee.", HttpStatus.NOT_FOUND);

        return <ApiResponse<EmployeeResponse>>{ isOk: true, data: this.transformToResponse(employee) };
    }

    @Get()
    getAll(): ApiResponse<EmployeeResponse[]> {
        const employeeResponses = this.employeeService.getAll().map(emp => this.transformToResponse(<EmployeeResponse>{ id: emp.id, name: emp.name, jobTitle: emp.jobTitle, department: emp.department }));
        return <ApiResponse<EmployeeResponse[]>>{ isOk: true, data: employeeResponses };
    }
}
