import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription.dto';

import { PushSubscription } from 'web-push';
import { SetScheduleScheduleDto } from 'src/setSubscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('new')
  public newSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    console.log('newSubscription', createSubscriptionDto);
    this.subscriptionService.addSubscription(createSubscriptionDto);
    return 'ok';
  }

  @Post('schedule')
  public setSchedule(@Body() scheduleDto: SetScheduleScheduleDto) {
    console.log('setSchedule', scheduleDto);
    this.subscriptionService.setSchedule(scheduleDto);
    return 'ok';
  }
}
