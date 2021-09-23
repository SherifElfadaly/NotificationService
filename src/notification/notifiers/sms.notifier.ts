import { Logger } from '@nestjs/common';
import { Notifier } from '../interfaces/notifier.interface';

export default class SmsNotifier implements Notifier {
  identifier: string;
  message: string;

  private readonly logger = new Logger(SmsNotifier.name);

  constructor(identifier: string, message: string) {
    this.identifier = identifier;
    this.message = message;
  }

  send(): boolean {
    this.logger.log(`${this.message} sent to ${this.identifier}`);
    // TODO: implment send message to the given identifier
    return true;
  }
}
