import { Test, TestingModule } from '@nestjs/testing';
import { NotifyDto } from '../app/dto/notify.dto';
import { NotificationTypes } from './enums/notification-types';
import NotifierFactory from './factories/notifier.factory';
import { Notifier } from './interfaces/notifier.interface';
import { NotifyResult } from './interfaces/notify.result';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let notifierFactory: NotifierFactory;
  const notifierMock = { 
    identifier: '',
    message: '',
    send: jest.fn().mockReturnValue({success: 1, failed: 0}) 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: NotifierFactory,
          useFactory: () => ({
            getNotifier: jest.fn((notifierType: string, notification: Notification): Notifier => notifierMock),
          }),
        }
      ],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
    notifierFactory = module.get<NotifierFactory>(NotifierFactory);
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  describe('notify', () => {
    it('should be defined', () => {
      expect(notificationService.notify).toBeDefined();
    });

    it('should call notifier factory getNotifier', async () => {
      const notification = new NotifyDto();
      notification.type = [NotificationTypes.SMS];
      await notificationService.notify(notification);

      expect(notifierFactory.getNotifier).toHaveBeenCalledWith(notification.type[0], notification);
    });

    it('should call notifier send', async () => {
      const notification = new NotifyDto();
      notification.type = [NotificationTypes.SMS];
      await notificationService.notify(notification);

      expect(notifierMock.send).toHaveBeenCalled();
    });

    it('should return number of success and failure', async () => {
      const notification = new NotifyDto();
      notification.type = [NotificationTypes.SMS];
      const result = await notificationService.notify(notification);

      expect(result as NotifyResult).toBeTruthy();
    });
  });
});
