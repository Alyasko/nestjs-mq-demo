import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { BullModule } from '@nestjs/bull';
import { EmailService } from '../email/email.service';
import { EmailModule } from '../email/email.module';
import { apiConfig } from '../common/globalConfigService';
import { IdParamPipe } from '../common/idParamPipe';
import { StorageService } from '../storage/storage.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmailService, IdParamPipe, StorageService],
  imports: [
    EmailModule,
    BullModule.registerQueue({
      name: apiConfig.emailQueueName,
    })
  ],
})
export class EmployeeModule { }
