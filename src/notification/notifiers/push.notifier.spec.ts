import { Test, TestingModule } from '@nestjs/testing';
import PushNotifier from './push.notifier';

describe('PushNotifier', () => {
  let pushNotifier: PushNotifier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushNotifier],
    }).compile();

    pushNotifier = module.get<PushNotifier>(PushNotifier);
  });

  it('should be defined', () => {
    expect(pushNotifier).toBeDefined();
  });

  describe('send', () => {
    it('should be defined', () => {
      expect(pushNotifier.send).toBeDefined();
    });

    it('should return boolean', async () => {
      const result = await pushNotifier.send();

      expect(typeof result == 'boolean').toBeTruthy();
    });
  });
});
