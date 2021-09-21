import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationModule } from '../notification/notification.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [BullModule, NotificationModule],
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('notify should be defined', () => {
    expect(controller.notify).toBeDefined();
  });

  it('notifyGroup should be defined', () => {
    expect(controller.notifyGroup).toBeDefined();
  });
});
