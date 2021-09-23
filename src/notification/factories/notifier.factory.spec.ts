import { Test, TestingModule } from '@nestjs/testing';
import { NotifyDto } from '../../app/dto/notify.dto';
import { NotificationTypes } from '../enums/notification-types';
import { Notifier } from '../interfaces/notifier.interface';
import NotifierFactory from './notifier.factory';

describe('NotifierFactory', () => {
  let notifierFactory: NotifierFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifierFactory],
    }).compile();

    notifierFactory = module.get<NotifierFactory>(NotifierFactory);
  });

  it('should be defined', () => {
    expect(notifierFactory).toBeDefined();
  });

  describe('getNotifier', () => {
    it('should be defined', () => {
      expect(notifierFactory.getNotifier).toBeDefined();
    });

    it('should return Notifier', async () => {
      const notification = new NotifyDto();
      const result = await notifierFactory.getNotifier(
        NotificationTypes.SMS,
        notification,
      );

      expect(result as Notifier).toBeTruthy();
    });
  });
});
