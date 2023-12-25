import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { BullModule } from '@nestjs/bull';

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
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
