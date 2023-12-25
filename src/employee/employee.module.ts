import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmailSchedulerService } from '../email-scheduler/email-scheduler.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessorService } from '../email-processor/email-processor.service';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { apiConfig } from '../common/globalConfigService';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmailService],
  imports: [
    EmailModule,
    BullModule.registerQueue({
      name: apiConfig.emailQueueName,
    })
  ],
})
export class EmployeeModule { }
