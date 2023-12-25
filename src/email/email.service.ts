import { Employee } from './../employee/model/employee';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailSchedulerService } from '../email-scheduler/email-scheduler.service';
import { WelcomeEmailQueueDto } from './dto/welcomeEmailQueueDto';

@Injectable()
export class EmailService {
    constructor(@InjectQueue('email') private emailQueue: Queue) { }

    async sendWelcomeEmail(employee: Employee) {
        console.log("Sending welcome email for ", employee.id);
        this.emailQueue.add(<WelcomeEmailQueueDto>{ employee: employee });
    }
}
