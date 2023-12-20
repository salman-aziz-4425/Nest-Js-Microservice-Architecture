import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notifyEmail(data: any): string {
    return 'Hello World!';
  }
}
