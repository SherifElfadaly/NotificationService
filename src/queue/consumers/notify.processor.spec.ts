import { Test, TestingModule } from '@nestjs/testing';
import { NotifyProcessor } from './notiyf.processor';

describe('NotifyProcessor', () => {
  let notifyProcessor: NotifyProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifyProcessor],
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
