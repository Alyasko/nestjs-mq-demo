import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmailSchedulerService } from '../email-scheduler/email-scheduler.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessorService } from '../email-processor/email-processor.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmailSchedulerService, EmailProcessorService],
  imports: [
    BullModule.registerQueue({
      name: 'email',
      // processors: [join(__dirname, 'processor.js')],
    })
  ],
})
export class EmployeeModule { }
