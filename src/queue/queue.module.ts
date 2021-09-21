import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module';
import { NotifyProcessor } from './consumers/notiyf.processor';

@Module({
  imports: [
    NotificationModule,
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('queue'),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'notify',
      defaultJobOptions: {
        attempts: 5,
        backoff: 60000
      }
    }),
  ],
  providers: [NotifyProcessor],
  exports: [BullModule, NotifyProcessor],
})
export class QueueModule {}
