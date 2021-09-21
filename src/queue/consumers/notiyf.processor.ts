import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Notification } from '../../notification/interfaces/notification.interface';
import { NotificationService } from '../../notification/notification.service';

@Processor('notify')
export class NotifyProcessor {
  constructor(private notificationService: NotificationService) { }

  @Process()
  notify(job: Job<Notification>) {
    this.notificationService.notify(job.data);
  }
}
