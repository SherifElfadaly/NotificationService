import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyDto } from './dto/notify-dto';
import { NotifyGroupDto } from './dto/notify-group-dto';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  describe('notify', () => {
    it('should return created job', async () => {
      const notification = new NotifyDto();
      expect(await controller.notify(notification)).toHaveBeenCalled();
    });
  });

  describe('notifyGroup', () => {
    it('should return array of created job', async () => {
      const notificationGroup = new NotifyGroupDto();
      expect(await controller.notifyGroup(notificationGroup)).toHaveBeenCalled();
    });
  });
});
