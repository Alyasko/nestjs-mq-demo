import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailSchedulerService } from '../email-scheduler/email-scheduler.service';
import { EmailProcessorService } from '../email-processor/email-processor.service';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.freesmtpservers.com',
                port: 25
            }
        }),
        BullModule.registerQueue({
            name: 'email'
        })
    ],
    providers: [
        EmailService
    ],
})
export class EmailModule { }
