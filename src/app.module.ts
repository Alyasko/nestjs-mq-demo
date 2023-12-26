import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { BullModule } from '@nestjs/bull';
import { EmailProcessorService } from './email-processor/email-processor.service';
import { ConfigModule } from '@nestjs/config';
import { apiConfig } from './common/globalConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EmployeeModule,
    BullModule.forRoot({
      redis: {
        host: apiConfig.redisHost,
        port: apiConfig.redisPort,
      },
    }),
    BullModule.registerQueue({
      name: apiConfig.emailQueueName,
    })
  ],
  controllers: [],
  providers: [EmailProcessorService],
})
export class AppModule { }
