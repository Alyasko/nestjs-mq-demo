import { Employee } from "../../employee/model/employee";
import { v4 as uuidv4 } from 'uuid';

export interface WelcomeEmailQueueItemDto {
    employee: Employee;
}

export class EmailQueueItemDto {
    readonly id: string;
    readonly to: string;
    readonly subject: string;
    readonly htmlBody: string;

    constructor(to: string, subject: string, htmlBody: string) {
        this.id = uuidv4();
        this.to = to;
        this.subject = subject;
        this.htmlBody = htmlBody;
    }
}

