import { Injectable } from '@nestjs/common';
import { NotifyDto } from './dto/notify-dto';
import { Job, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
    constructor(
        @InjectQueue('notify') private notifyQueue: Queue
    ) { }

    async notify(notification: NotifyDto): Promise<Job> {
        return await this.notifyQueue.add(notification);
    }

    async notifyGroup(notifications: NotifyDto[]): Promise<Job[]>  {
        const jobs = [];
        for (let index = 0; index < notifications.length; index++) {
            const job = await this.notifyQueue.add(notifications[index]);
            jobs.push(job);
        }

        return jobs;
    }
}
