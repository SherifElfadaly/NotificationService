import { Module } from '@nestjs/common';
import NotifierFactory from './factories/notifier.factory';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, NotifierFactory],
  exports: [NotificationService]
})
export class NotificationModule {}
