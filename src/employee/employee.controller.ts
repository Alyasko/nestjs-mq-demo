import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/updateEmployeeDto';
import { EmployeeResponse } from './dto/EmployeeResponse';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.create(createEmployeeDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeeService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.employeeService.delete(id);
    }

    @Get()
    findAll(): EmployeeResponse[] {
        // TODO: transform to Generic response.
        return this.employeeService.getAll().map(emp => <EmployeeResponse>{ id: emp.id, name: emp.name, jobTitle: emp.jobTitle });
    }

}
