import { Injectable } from '@nestjs/common';
import { Employee } from './model/employee';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { UpdateEmployeeDto } from "./dto/updateEmployeeDto";
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class EmployeeService {

    constructor(private emailService: EmailService, private storageService: StorageService<Employee>) { }

    create(employeeDto: CreateEmployeeDto): Employee {
        const employee = new Employee(employeeDto.name, employeeDto.jobTitle, employeeDto.department);

        this.storageService.add(employee);
        this.emailService.sendWelcomeEmail(employee);

        return employee;
    }

    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Employee {
        const employee = this.storageService.get(id);
        if (employee === null) {
            return null;
        }

        employee.name = updateEmployeeDto.name;
        employee.jobTitle = updateEmployeeDto.jobTitle;
        employee.department = updateEmployeeDto.department;

        this.storageService.replace(id, employee);

        return employee;
    }

    delete(id: string): boolean {

        const employee = this.storageService.get(id);
        if (employee === null) {
            return false;
        }

        this.emailService.sendFiringEmail(employee);

        const isDeleted = this.storageService.delete(id);
        return isDeleted;
    }

    get(id: string): Employee | null {
        const employee = this.storageService.get(id);
        return employee;
    }

    getAll(): Employee[] {
        return this.storageService.getAll();
    }
}
