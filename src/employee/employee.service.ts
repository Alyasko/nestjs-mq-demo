import { HttpException, Injectable } from '@nestjs/common';
import { Employee } from './model/employee';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { UpdateEmployeeDto } from "./dto/updateEmployeeDto";
import { StorageService } from '../storage/storage.service';

@Injectable()
export class EmployeeService {

    constructor(private storageService: StorageService<Employee>) { }

    /**
     * Creates a new employee. Sends a welcome email to the newly created employee.
     * @param employeeDto - The data for creating the employee.
     * @returns The created employee.
     */
    create(employeeDto: CreateEmployeeDto): Employee {
        const employee = new Employee(employeeDto.name, employeeDto.jobTitle, employeeDto.department);

        this.storageService.add(employee);

        return employee;
    }

    /**
     * Updates an existing employee.
     * @param id - The ID of the employee to update.
     * @param updateEmployeeDto - The data for updating the employee.
     * @returns The updated employee.
     */
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

    /**
     * Deletes an employee.
     * @param id - The ID of the employee to delete.
     * @returns Deleted employee if the it was successfully deleted, null otherwise.
     */
    delete(id: string): Employee {
        const employee = this.storageService.get(id);
        if (employee === null) {
            return null;
        }

        const isDeleted = this.storageService.delete(id);
        if (isDeleted === false) {
            return null;
        }

        return employee;
    }

    /**
     * Retrieves an employee by ID.
     * @param id - The ID of the employee to retrieve.
     * @returns The retrieved employee, or null if not found.
     */
    get(id: string): Employee {
        const employee = this.storageService.get(id);
        return employee;
    }

    /**
     * Retrieves all employees.
     * @returns An array of all employees.
     */
    getAll(): Employee[] {
        return this.storageService.getAll();
    }
}
