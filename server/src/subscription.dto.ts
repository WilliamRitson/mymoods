import { PushSubscription } from 'web-push';

export class CreateSubscriptionDto {
  readonly token: string;
  readonly subscription: PushSubscription;
}
