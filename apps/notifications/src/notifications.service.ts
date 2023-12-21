import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    console.log('helooo notications');
    console.log(data);
    return 'Hello World!';
  }
}
