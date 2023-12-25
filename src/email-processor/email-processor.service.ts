import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

// https://www.wpoven.com/tools/free-smtp-server-for-testing#

@Processor('email')
export class EmailProcessorService {

    constructor(private readonly mailerService: MailerService) { }

    @Process()
    async sendEmail(job: Job<unknown>) {
        console.log("Processing email: ", job.data);

        this
            .mailerService
            .sendMail({
                to: 'test@nestjs.com', // list of receivers
                from: 'noreply@nestjs.com', // sender address
                subject: 'Hello!', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .then((success) => {
                console.log(success)
            })
            .catch((err) => {
                console.log(err)
            });

        // let progress = 0;
        // for (let i = 0; i < 100; i++) {
        //     // await doSomething(job.data);
        //     progress += 1;
        //     await job.progress(progress);
        // }
        return {};
    }
}
