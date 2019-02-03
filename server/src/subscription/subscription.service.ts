import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PushSubscription, setVapidDetails, sendNotification } from 'web-push';
import { SetScheduleScheduleDto } from 'src/setSubscription.dto';
import { CreateSubscriptionDto } from 'src/subscription.dto';

interface Subscriber {
  subscriptionToken: PushSubscription;
}

@Injectable()
export class SubscriptionService {
  private subscribers = new Map<string, PushSubscription>();
  private schedules = new Map<string, number[]>();

  constructor(configService: ConfigService) {
    setVapidDetails(
      configService.vars.vapidSubject,
      configService.vars.publicVapidKey,
      configService.vars.privateVapidKey,
    );
    this.notifySubscribers();
  }

  public addSubscription(subscriptinDto: CreateSubscriptionDto) {
    this.subscribers.set(subscriptinDto.token, subscriptinDto.subscription);
  }

  public setSchedule(scheduleDto: SetScheduleScheduleDto): any {
    console.log('add schedule',  scheduleDto.notificaitonTimes, 'for', scheduleDto.token);
    this.schedules.set(scheduleDto.token, scheduleDto.notificaitonTimes);
  }

  private shouldSetToSubsciber(token: string) {
    const now = new Date();
    const timeOfDayInMinutes = now.getHours() * 60 + now.getMinutes();
    const scheduledReminders = this.schedules.get(token) || [];
    console.log('the clock strikes', timeOfDayInMinutes);
    for (const reminder of scheduledReminders) {
      console.log(reminder, timeOfDayInMinutes);
      if (reminder === timeOfDayInMinutes) {
        return true;
      }
    }
    return false;
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
      for (const subscriberToken of Array.from(this.subscribers.keys())) {
        if (this.shouldSetToSubsciber(subscriberToken)) {
          console.log('notify', subscriberToken);
          promises.push(
            sendNotification(
              this.subscribers.get(subscriberToken),
              JSON.stringify(payload),
            ),
          );
        }
      }
    }, 60 * 1000);
  }
}
