import { Employee } from './../employee/model/employee';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailSchedulerService } from '../email-scheduler/email-scheduler.service';

@Injectable()
export class EmailService {
    constructor(@InjectQueue('email') private emailQueue: Queue) { }

    async sendWelcomeEmail(employee: Employee) {
        console.log("Sending email for ", employee.id);

        this.emailQueue.add({ to: "e@empl.com", subject: "Welcome!", body: "How are you?" });
    }
}
