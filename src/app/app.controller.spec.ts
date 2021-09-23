import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyDto } from './dto/notify.dto';
import { NotifyGroupDto } from './dto/notify-group.dto';
import { JobId } from 'bull';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppService,
          useFactory: () => ({
            notify: jest.fn(
              (notification: NotifyDto): Promise<JobId> => Promise.resolve(1),
            ),
            notifyGroup: jest.fn(
              (notification: NotifyDto): Promise<JobId[]> =>
                Promise.resolve([1]),
            ),
          }),
        },
      ],
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('notify', () => {
    it('should be defined', () => {
      expect(appController.notify).toBeDefined();
    });

    it('should call service notify', async () => {
      const notification = new NotifyDto();
      await appController.notify(notification);

      expect(appService.notify).toHaveBeenCalledWith(notification);
    });

    it('should return job', async () => {
      const notification = new NotifyDto();
      const result = await appController.notify(notification);

      expect(result as JobId).toBeTruthy();
    });
  });

  describe('notifyGroup', () => {
    it('should be defined', () => {
      expect(appController.notifyGroup).toBeDefined();
    });

    it('should call service notifyGroup', async () => {
      const groupNotification = new NotifyGroupDto();
      const notification = new NotifyDto();
      groupNotification.recipients = [notification];
      await appController.notifyGroup(groupNotification);

      expect(appService.notifyGroup).toHaveBeenCalledWith(
        groupNotification.recipients,
      );
    });

    it('should return jobs array', async () => {
      const groupNotification = new NotifyGroupDto();
      groupNotification.recipients = [new NotifyDto()];
      const result = await appController.notifyGroup(groupNotification);

      expect(result as JobId[]).toBeTruthy();
    });
  });
});
