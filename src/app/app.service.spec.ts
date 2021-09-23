import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { JobId } from 'bull';
import { AppService } from './app.service';
import { NotifyDto } from './dto/notify.dto';
import { NotifyGroupDto } from './dto/notify-group.dto';

describe('AppService', () => {
  let appService: AppService;
  const notifyQueueMock = { add: jest.fn().mockReturnValue({ id: 1 }) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [
        BullModule.registerQueue({
          name: 'notify',
        }),
      ],
    })
      .overrideProvider(getQueueToken('notify'))
      .useValue(notifyQueueMock)
      .compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('notify', () => {
    it('should be defined', () => {
      expect(appService.notify).toBeDefined();
    });

    it('should dispatch notify job', async () => {
      const notification = new NotifyDto();
      await appService.notify(notification);

      expect(notifyQueueMock.add).toHaveBeenCalledWith(notification);
    });

    it('should return job', async () => {
      const notification = new NotifyDto();
      const result = await appService.notify(notification);

      expect(result as JobId).toBeTruthy();
    });
  });

  describe('notifyGroup', () => {
    it('should be defined', () => {
      expect(appService.notifyGroup).toBeDefined();
    });

    it('should dispatch notifyGroup job', async () => {
      const groupNotification = new NotifyGroupDto();
      const notification = new NotifyDto();
      groupNotification.recipients = [notification];
      await appService.notifyGroup(groupNotification.recipients);

      expect(notifyQueueMock.add).toHaveBeenCalledWith(notification);
    });

    it('should return jobs array', async () => {
      const groupNotification = new NotifyGroupDto();
      groupNotification.recipients = [new NotifyDto()];
      const result = await appService.notifyGroup(groupNotification.recipients);

      expect(result as JobId[]).toBeTruthy();
    });
  });
});
