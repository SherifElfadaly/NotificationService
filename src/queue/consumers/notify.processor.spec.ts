import { Test, TestingModule } from '@nestjs/testing';
import { Notification } from 'src/notification/interfaces/notification.interface';
import { NotifyResult } from 'src/notification/interfaces/notify.result';
import { NotificationService } from '../../notification/notification.service';
import { NotifyProcessor } from './notiyf.processor';

describe('NotifyProcessor', () => {
  let notifyProcessor: NotifyProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotifyProcessor,
        {
          provide: NotificationService,
          useFactory: () => ({
            notify: jest.fn(
              (notification: Notification): NotifyResult => ({ success: 0, failed: 0 }),
            ),
          }),
        },
      ],
    }).compile();

    notifyProcessor = module.get<NotifyProcessor>(NotifyProcessor);
  });

  it('should be defined', () => {
    expect(notifyProcessor).toBeDefined();
  });

  describe('notify', () => {
    it('should be defined', () => {
      expect(notifyProcessor.notify).toBeDefined();
    });
  });
});
