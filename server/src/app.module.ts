import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { ConfigService } from './config/config.service';
import { SubscriptionService } from './subscription/subscription.service';

@Module({
  imports: [],
  controllers: [AppController, SubscriptionsController],
  providers: [AppService, ConfigService, SubscriptionService],
})
export class AppModule {

}
