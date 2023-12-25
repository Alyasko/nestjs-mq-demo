import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { WelcomeEmailQueueDto } from '../email/dto/welcomeEmailQueueDto';

// https://www.wpoven.com/tools/free-smtp-server-for-testing#

@Processor('email')
export class EmailProcessorService {

    constructor(private readonly mailerService: MailerService) { }

    @Process()
    async sendEmail(job: Job<WelcomeEmailQueueDto>) {
        const targetEmployee = job.data.employee;

        try {
            await this.mailerService.sendMail({
                to: 'employee@employee.com',
                from: 'noreply@alex.com',
                subject: `Welcome to our ${targetEmployee.department} department!`,
                text: `Welcome ${targetEmployee.name}`,
                html: `<b>Welcome ${targetEmployee.name}</b><br/>We're happy to invite you to our ${targetEmployee.department} department for ${targetEmployee.jobTitle} position!`,
            });

            console.log(`Email sent to ${targetEmployee.id}`);
        }
        catch (e) {
            console.error(e);
        }
    }
}
