import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateSubscriptionDto } from 'src/subscription.dto';

import { PushSubscription } from 'web-push';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('new')
  public newSubscription(@Body() createSubscriptionDto: PushSubscription) {
    this.subscriptionService.addSubscription(createSubscriptionDto);
    return 'ok';
  }
}
