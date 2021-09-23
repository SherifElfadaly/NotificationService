import {
  IsNotEmpty,
  IsEnum,
  ValidateIf,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
} from 'class-validator';
import { NotificationTypes } from '../../notification/enums/notification-types';
import { Notification } from '../../notification/interfaces/notification.interface';

export class NotifyDto implements Notification {
  @IsNotEmpty()
  @IsString()
  message: string;

  @ValidateIf((data) => data.type.includes(NotificationTypes.SMS))
  @IsNotEmpty()
  phone: string;

  @ValidateIf((data) => data.type.includes(NotificationTypes.PUSH))
  @IsNotEmpty()
  device_token: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsEnum(NotificationTypes, { each: true })
  type: string[];
}
