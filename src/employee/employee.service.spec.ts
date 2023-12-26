import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { Employee } from './model/employee';
import { CreateEmployeeDto } from './dto/createEmployeeDto';
import { UpdateEmployeeDto } from './dto/updateEmployeeDto';
import { BullModule } from '@nestjs/bull';

describe('EmployeeService', () => {
    let service: EmployeeService;
    let emailService: EmailService;
    let storageService: StorageService<Employee>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmployeeService,
                EmailService,
                StorageService,
            ],
            imports: [
                BullModule.registerQueue({
                    name: "email",
                })
            ],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
        emailService = module.get<EmailService>(EmailService);
        storageService = module.get<StorageService<Employee>>(StorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new employee', () => {
            const employeeDto: CreateEmployeeDto = {
                name: 'John Doe',
                jobTitle: 'Software Engineer',
                department: 'Engineering',
            };

            const storageServiceAddSpy = jest.spyOn(storageService, 'add');

            const result = service.create(employeeDto);

            expect(storageServiceAddSpy).toHaveBeenCalled();
            expect(result.name).toEqual(employeeDto.name);
        });
    });

    describe('update', () => {
        it('should update an existing employee', () => {
            const updateEmployeeDto: UpdateEmployeeDto = {
                name: 'Jane Smith',
                jobTitle: 'Senior Software Engineer',
                department: 'Engineering',
            };
            const employee = new Employee('John Doe', 'Software Engineer', 'Engineering');

            jest.spyOn(storageService, 'get').mockReturnValueOnce(employee);
            const storageServiceReplaceSpy = jest.spyOn(storageService, 'replace');

            const result = service.update(employee.id, updateEmployeeDto);

            expect(storageServiceReplaceSpy).toHaveBeenCalledWith(employee.id, employee);
        });

        it('should return null if the employee does not exist', () => {
            const id = '1';
            const updateEmployeeDto: UpdateEmployeeDto = {
                name: 'Jane Smith',
                jobTitle: 'Senior Software Engineer',
                department: 'Engineering',
            };

            jest.spyOn(storageService, 'get').mockReturnValueOnce(null);

            const result = service.update(id, updateEmployeeDto);

            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it('should delete an existing employee', () => {
            const employee = new Employee('John Doe', 'Software Engineer', 'Engineering');

            jest.spyOn(storageService, 'get').mockReturnValueOnce(employee);
            jest.spyOn(storageService, 'delete').mockReturnValueOnce(true);
            const storageServiceDeleteSpy = jest.spyOn(storageService, 'delete');

            const result = service.delete(employee.id);

            expect(storageServiceDeleteSpy).toHaveBeenCalledWith(employee.id);
            expect(result).not.toBe(null);
        });

        it('should return null if the employee does not exist', () => {
            const id = '1';

            jest.spyOn(storageService, 'get').mockReturnValueOnce(null);

            const result = service.delete(id);

            expect(result).toBe(null);
        });
    });

    describe('get', () => {
        it('should retrieve an existing employee by ID', () => {
            const id = '1';
            const employee = new Employee('John Doe', 'Software Engineer', 'Engineering');

            jest.spyOn(storageService, 'get').mockReturnValueOnce(employee);

            const result = service.get(id);

            expect(result).toEqual(employee);
        });

        it('should return null if the employee does not exist', () => {
            const id = '1';

            jest.spyOn(storageService, 'get').mockReturnValueOnce(null);

            const result = service.get(id);

            expect(result).toBeNull();
        });
    });

    describe('getAll', () => {
        it('should retrieve all employees', () => {
            const employees = [
                new Employee('John Doe', 'Software Engineer', 'Engineering'),
                new Employee('Jane Smith', 'Senior Software Engineer', 'Engineering'),
            ];

            jest.spyOn(storageService, 'getAll').mockReturnValueOnce(employees);

            const result = service.getAll();

            expect(result).toEqual(employees);
        });
    });
});