import { NotificationTypes } from '../enums/notification-types';
import { Notification } from '../interfaces/notification.interface';
import { Notifier } from '../interfaces/notifier.interface';
import PushNotifier from '../notifiers/push.notifier';
import SmsNotifier from '../notifiers/sms.notifier';

export default class NotifierFactory {
  getNotifier(notifierType: string, notification: Notification): Notifier {
    switch (notifierType) {
      case NotificationTypes.PUSH:
        return new PushNotifier(
          notification.device_token,
          notification.message,
        );
      case NotificationTypes.SMS:
        return new SmsNotifier(notification.phone, notification.message);
    }
  }
}
