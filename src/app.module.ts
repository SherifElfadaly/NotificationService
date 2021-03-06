import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';
import { NotificationModule } from './notification/notification.module';
import queueConfig from './queue/config/queue.config';
import appConfig from './app/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [queueConfig, appConfig],
    }),
    QueueModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
