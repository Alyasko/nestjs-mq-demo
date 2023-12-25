import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessorService {
    @Process()
    async sendEmail(job: Job<unknown>) {
        console.log("Processing email: ", job.data);

        let progress = 0;
        for (let i = 0; i < 100; i++) {
            // await doSomething(job.data);
            progress += 1;
            await job.progress(progress);
        }
        return {};
    }
}
