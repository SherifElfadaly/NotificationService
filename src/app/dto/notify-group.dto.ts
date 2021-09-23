import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NotifyDto } from './notify.dto';

export class NotifyGroupDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => NotifyDto)
    recipients: NotifyDto[];
}