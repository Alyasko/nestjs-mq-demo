import { Employee } from './model/employee';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/updateEmployeeDto';
import { EmployeeResponse } from './dto/EmployeeResponse';
import { IdParamPipe } from '../common/idParamPipe';
import { ApiOperation, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { ApiResponse } from '../common/apiResponse';
import { EmailService } from '../email/email.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService, private emailService: EmailService) { }

    private transformToResponse(employee: Employee): EmployeeResponse {
        return <EmployeeResponse>{ id: employee.id, name: employee.name, jobTitle: employee.jobTitle, department: employee.department };
    }

    @ApiOperation({ summary: "Create a new employee" })
    @SwaggerApiResponse({ status: 201, description: "The employee has been successfully created." })
    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto): ApiResponse<EmployeeResponse> {
        const employee = this.employeeService.create(createEmployeeDto);
        this.emailService.sendWelcomeEmail(employee);

        return <ApiResponse<EmployeeResponse>>{ isOk: true, data: this.transformToResponse(employee) };
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing employee' })
    @SwaggerApiResponse({ status: 200, description: 'The employee has been successfully updated.' })
    update(@Param('id', IdParamPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): ApiResponse<EmployeeResponse> {
        const employee = this.employeeService.update(id, updateEmployeeDto);
        if (employee === null)
            throw new HttpException("Unable to update employee.", HttpStatus.NOT_FOUND);

        return <ApiResponse<EmployeeResponse>>{ isOk: true, data: this.transformToResponse(employee) };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an employee' })
    @SwaggerApiResponse({ status: 200, description: 'The employee has been successfully deleted.' })
    delete(@Param('id', IdParamPipe) id: string): ApiResponse {
        const deletedEmployee = this.employeeService.delete(id);
        if (deletedEmployee === null) {
            throw new HttpException("Unable to delete employee.", HttpStatus.NOT_FOUND);
        }

        this.emailService.sendFiringEmail(deletedEmployee);

        return <ApiResponse>{ isOk: true };
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get a specific employee' })
    @SwaggerApiResponse({ status: 200, description: 'The employee has been successfully retrieved.' })
    get(@Param("id", IdParamPipe) id: string): ApiResponse<EmployeeResponse> {
        const employee = this.employeeService.get(id);
        if (employee === null)
            throw new HttpException("Unable to get employee.", HttpStatus.NOT_FOUND);

        return <ApiResponse<EmployeeResponse>>{ isOk: true, data: this.transformToResponse(employee) };
    }

    @Get()
    @ApiOperation({ summary: 'Get all employees' })
    @SwaggerApiResponse({ status: 200, description: 'The list of employees has been successfully retrieved.' })
    getAll(): ApiResponse<EmployeeResponse[]> {
        const employeeResponses = this.employeeService.getAll().map(emp => this.transformToResponse(<EmployeeResponse>{ id: emp.id, name: emp.name, jobTitle: emp.jobTitle, department: emp.department }));
        return <ApiResponse<EmployeeResponse[]>>{ isOk: true, data: employeeResponses };
    }
}
