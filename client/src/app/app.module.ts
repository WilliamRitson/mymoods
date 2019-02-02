import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MoodEntryComponent } from './mood-entry/mood-entry.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TimeagoModule } from 'ngx-timeago';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import {LineChartModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoodEntryComponent,
    HomeComponent,
    NavbarComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    LineChartModule,
    TimeagoModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  private ns: NotificationService;

  constructor(ns: NotificationService) {
    this.ns = ns;

    const d = new Date();

    console.log('Schedduling a notifcation in one minute!');
    ns.scheduleNewNotifcation(
      { body: 'Time to enter your current mood!' },
      60 * d.getHours() + d.getMinutes() + 1
    );
  }
}
