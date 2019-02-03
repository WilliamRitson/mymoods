import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PushSubscription, setVapidDetails, sendNotification } from 'web-push';

interface Subscriber {
  subscriptionToken: PushSubscription;
}

@Injectable()
export class SubscriptionService {
  private subscribers: PushSubscription[] = [];

  constructor(configService: ConfigService) {
    setVapidDetails(
      configService.vars.vapidSubject,
      configService.vars.publicVapidKey,
      configService.vars.privateVapidKey,
    );
    this.notifySubscribers();
  }

  public addSubscription(pushSubscription: PushSubscription) {
    this.subscribers.push(pushSubscription);
  }

  private notifySubscribers() {
    setInterval(() => {
      const payload = {
        notification: {
          title: 'Mood tracker reminder',
          body: 'A friendly reminder to record your mood now.',
        },
      };
      const promises = [];
      for (const subscriber of this.subscribers) {
        promises.push(sendNotification(subscriber, JSON.stringify(payload)));
      }
    }, 60 * 1000);
  }
}
