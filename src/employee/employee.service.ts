import { Injectable } from '@nestjs/common';
import { Employee } from './model/employee';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { UpdateEmployeeDto } from "./dto/updateEmployeeDto";
import { EmailSchedulerService } from '../email-scheduler/email-scheduler.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class EmployeeService {

    private employees: Employee[] = []; // This array will act as in-memory data store

    constructor(private emailService: EmailService) { }

    create(employeeDto: CreateEmployeeDto): Employee {
        const employee = new Employee(employeeDto.name, employeeDto.jobTitle, employeeDto.department);

        this.employees.push(employee);

        this.emailService.sendWelcomeEmail(employee);

        return employee;
    }

    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Employee {
        const employeeIndex = this.employees.findIndex(emp => emp.id === id);
        if (employeeIndex === -1) {
            return null; // TODO: return error.
        }

        const employee = this.employees[employeeIndex];

        employee.name = updateEmployeeDto.name;
        employee.jobTitle = updateEmployeeDto.jobTitle;
        employee.department = updateEmployeeDto.department;

        return employee;
    }

    delete(id: string): boolean {
        const employeeIndex = this.employees.findIndex(emp => emp.id === id);
        if (employeeIndex === -1) {
            return false;
        }

        this.employees.splice(employeeIndex, 1);

        return true;
    }

    get(id: string): Employee | null {
        const e = this.employees.find(emp => emp.id === id);
        return e || null;
    }

    getAll(): Employee[] {
        return this.employees;
    }
}
