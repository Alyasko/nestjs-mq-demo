import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailSchedulerService {
    constructor(@InjectQueue('email') private audioQueue: Queue) { }

    async scheduleEmail(to: string, subject: string, body: string) {
        console.log("Scheduling email");

        await this.audioQueue.add({ to, subject, body });
    }
}
