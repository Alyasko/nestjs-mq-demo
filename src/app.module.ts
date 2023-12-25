import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [EmployeeModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
