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
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { LineChartModule, PieChartModule } from '@swimlane/ngx-charts';
import { MoodPieChartComponent } from './mood-pie-chart/mood-pie-chart.component';
import { MoodLineChartComponent } from './mood-line-chart/mood-line-chart.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoodEntryComponent,
    HomeComponent,
    NavbarComponent,
    SettingsComponent,
    MoodPieChartComponent,
    MoodLineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    LineChartModule,
    PieChartModule,
    TimeagoModule.forRoot(),
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyBmRYvLSHmPdcjuL6Tsa9O16tjYD0jceX0',
      authDomain: 'slo-hacks-2019-45008.firebaseapp.com',
      databaseURL: 'https://slo-hacks-2019-45008.firebaseio.com',
      projectId: 'slo-hacks-2019-45008',
      storageBucket: 'slo-hacks-2019-45008.appspot.com',
      messagingSenderId: '1054108981104'
    }, () => 'MyMoods', {
      enableFirestoreSync: false, // enable/disable autosync users with firestore
      onlyEmailPasswordAuth : false, // enable/disable signin/up with auth providers like google, facebook, twitter - default: false
      toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
      toastMessageOnAuthError: true // whether to open/show a snackbar message on auth error - default : true
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  private ns: NotificationService;

  constructor(ns: NotificationService, angularAuth: AngularFireAuth, router: Router) {
    angularAuth.user.subscribe(user => {
      if (!user && router.url !== '/login') {
        router.navigateByUrl('/login');
      }
    });
    this.ns = ns;

    const d = new Date();

    console.log('Schedduling a notifcation in one minute!');
    ns.scheduleNewNotifcation(
      { body: 'Time to enter your current mood!' },
      60 * d.getHours() + d.getMinutes() + 1
    );
  }
}
