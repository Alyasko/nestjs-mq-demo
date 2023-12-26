import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailQueueItemDto } from '../email/dto/welcomeEmailQueueItemDto';

// https://www.wpoven.com/tools/free-smtp-server-for-testing#

// TODO: separate email sending logic from queue processing.
@Processor('email')
export class EmailProcessorService {

    constructor(private readonly mailerService: MailerService) { }

    @Process()
    async sendEmail(job: Job<EmailQueueItemDto>) {
        const queueItem = job.data;

        try {
            await this.mailerService.sendMail({
                to: queueItem.to,
                from: 'noreply@prb.com',
                subject: queueItem.subject,
                html: queueItem.htmlBody,
            });

            console.log(`Email ${queueItem.id} has been sent.`);
        }
        catch (e) {
            console.error(e);
        }
    }
}
