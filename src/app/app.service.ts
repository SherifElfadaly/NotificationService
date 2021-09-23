import { Injectable } from '@nestjs/common';
import { NotifyDto } from './dto/notify.dto';
import { JobId, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('notify') private notifyQueue: Queue) {}

  async notify(notification: NotifyDto): Promise<JobId> {
    return (await this.notifyQueue.add(notification)).id;
  }

  async notifyGroup(notifications: NotifyDto[]): Promise<JobId[]> {
    const jobs = [];
    for (let index = 0; index < notifications.length; index++) {
      const job = (await this.notifyQueue.add(notifications[index])).id;
      jobs.push(job);
    }

    return jobs;
  }
}
