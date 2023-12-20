import { isEmail } from 'class-validator';

export class NotifyEmailDto {
  @isEmail()
  email: string;
}
