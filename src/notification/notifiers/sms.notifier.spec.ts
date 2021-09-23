import { Test, TestingModule } from '@nestjs/testing';
import SmsNotifier from './sms.notifier';

describe('SmsNotifier', () => {
  let smsNotifier: SmsNotifier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsNotifier],
    }).compile();

    smsNotifier = module.get<SmsNotifier>(SmsNotifier);
  });

  it('should be defined', () => {
    expect(smsNotifier).toBeDefined();
  });

  describe('send', () => {
    it('should be defined', () => {
      expect(smsNotifier.send).toBeDefined();
    });

    it('should return boolean', async () => {
      const result = await smsNotifier.send();

      expect(typeof result == 'boolean').toBeTruthy();
    });
  });
});
