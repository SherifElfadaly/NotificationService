import { Injectable } from '@nestjs/common';
import NotifierFactory from './factories/notifier.factory';
import { Notification } from './interfaces/notification.interface';

@Injectable()
export class NotificationService {
    constructor(private notifierFactory: NotifierFactory) {}

    notify(notification: Notification) {
        notification.type.forEach((notifierType) => {
            this.notifierFactory.getNotifier(notifierType, notification).send();
        });
    }
}
