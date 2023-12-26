import { Employee } from './../employee/model/employee';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailQueueItemDto } from './dto/welcomeEmailQueueItemDto';

@Injectable()
export class EmailService {
    constructor(@InjectQueue('email') private emailQueue: Queue) { }

    async sendWelcomeEmail(employee: Employee) {
        // TODO: implement logging subsystem.

        const emailQueueItem = new EmailQueueItemDto(
            "employee@test.com",
            `Welcome to our ${employee.department} department!`,
            `<b>Welcome ${employee.name}</b><br/>We're happy to invite you to our ${employee.department} department for ${employee.jobTitle} position!`
        );

        console.log(`Sending welcome email ${emailQueueItem.id} for employee ${employee.id}`);

        await this.emailQueue.add(emailQueueItem);
    }

    async sendFiringEmail(employee: Employee) {
        const emailQueueItem = new EmailQueueItemDto(
            "employee@test.com",
            `Dear ${employee.name}!`,
            `<b>Hi ${employee.name}</b><br/>Unfortunately you've been fired from ${employee.department} department from ${employee.jobTitle} position!`
        );

        console.log(`Sending firing email ${emailQueueItem.id} for employee ${employee.id}`);

        await this.emailQueue.add(emailQueueItem);
    }
}
