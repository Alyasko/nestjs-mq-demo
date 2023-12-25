import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { BullModule } from '@nestjs/bull';
import { EmailService } from './email/email.service';
import { EmailSchedulerService } from './email-scheduler/email-scheduler.service';
import { EmailProcessorService } from './email-processor/email-processor.service';

@Module({
  imports: [EmployeeModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'email',
      // processors: [join(__dirname, 'processor.js')],
    }),],
  controllers: [AppController],
  providers: [AppService, EmailService, EmailSchedulerService],
})
export class AppModule { }
