import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { apiConfig } from '../common/globalConfigService';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: apiConfig.smtpHost,
                port: apiConfig.smtpPort,
            }
        }),
        BullModule.registerQueue({
            name: apiConfig.emailQueueName,
        })
    ],
    providers: [
        EmailService
    ],
})
export class EmailModule { }
