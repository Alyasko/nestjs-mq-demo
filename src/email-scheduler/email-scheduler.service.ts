import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Employee } from '../employee/model/employee';

@Injectable()
export class EmailSchedulerService {

}
