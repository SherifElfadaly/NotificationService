import { Controller, UseFilters, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { JobId } from 'bull';
import { AppService } from './app.service';
import { NotifyDto } from './dto/notify.dto';
import { NotifyGroupDto } from './dto/notify-group.dto';
import { ValidationFilter } from './exception-filters/rpc-validation.filter';

@Controller('app')
export class AppController {
  constructor(private appService: AppService) {}

  @EventPattern('notify')
  @UseFilters(new ValidationFilter())
  notify(
    @Payload(new ValidationPipe({ whitelist: true, transform: true }))
    payload: NotifyDto,
  ): Promise<JobId> {
    return this.appService.notify(payload);
  }

  @EventPattern('notify-group')
  @UseFilters(new ValidationFilter())
  notifyGroup(
    @Payload(new ValidationPipe({ whitelist: true, transform: true }))
    payload: NotifyGroupDto,
  ): Promise<JobId[]> {
    return this.appService.notifyGroup(payload.recipients);
  }
}
