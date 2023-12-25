import { v4 as uuidv4 } from 'uuid';

export class Employee {
    constructor(name: string, jobTitle: string) {
        this.id = uuidv4();
        this.name = name;
        this.jobTitle = jobTitle;
    }

    readonly id: string;
    name: string;
    jobTitle: string;
}