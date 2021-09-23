import { Injectable } from '@nestjs/common';
import NotifierFactory from './factories/notifier.factory';
import { Notification } from './interfaces/notification.interface';
import { NotifyResult } from './interfaces/notify.result';

@Injectable()
export class NotificationService {
  constructor(private notifierFactory: NotifierFactory) {}

  notify(notification: Notification): NotifyResult {
    const notifyResult = { success: 0, failed: 0 };
    notification.type.forEach((notifierType) => {
      const notifier = this.notifierFactory.getNotifier(
        notifierType,
        notification,
      );
      notifier.send() ? notifyResult.success++ : notifyResult.failed++;
    });

    return notifyResult;
  }
}
