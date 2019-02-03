import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private static notificationStorageKey = 'notification-settings';
  private static readonly PUBKEY =
    'BLAQHuBcqmChs7LD2XX29KihAI-qtVKl8fBtx3MILzY3zcnV29zf8i5U_C6BpHwcEH5XH7yipDaTGcYygBSYS5g';
  private static readonly SERVER_URL =
    'http://localhost:3000/subscriptions/new';

  private allNotifications: Object;
  private notificationPermissionGranted: boolean;

  constructor(private swPush: SwPush, private http: HttpClient) {
    this.allNotifications = {};

    // If the sw is available, use it instead of normal browser notifications
    console.log('Push enabled:', swPush.isEnabled);
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: NotificationService.PUBKEY
        })
        .then(subscription => {
          this.http
            .post(NotificationService.SERVER_URL, subscription, {
              responseType: 'text'
            })
            .subscribe();
          this.notificationPermissionGranted = true;
        })
        .catch(err => {
          this.notificationPermissionGranted = false;
          console.error(err);
        });
    } else {
      const notificationSettings = localStorage.getItem(
        NotificationService.notificationStorageKey
      );

      // If stored, then permission already acquired
      if (notificationSettings) {
        const parsedSettings = JSON.parse(notificationSettings);

        parsedSettings.forEach(timeOfDay => {
          this.scheduleNewNotifcation(
            { body: 'Time to enter your current mood!' },
            parseInt(timeOfDay, 10)
          );
        });
      } else {
        Notification.requestPermission(status => {
          if (status === 'granted') {
            // Insert empty data into the local storage to indicate that notif has permission
            localStorage.setItem(
              NotificationService.notificationStorageKey,
              '[]'
            );
          }
        });
      }
    }
  }

  public isGranted() {
    return (
      this.notificationPermissionGranted ||
      Notification.permission === 'granted'
    );
  }

  public getScheduledNotifications(): Array<number> {
    const timeStamps = [];
    Object.keys(this.allNotifications).forEach(element => {
      timeStamps.push(parseInt(element, 10));
    });
    return timeStamps;
  }

  public removeScheduledNotification(timeOfDay: number) {
    if (timeOfDay in this.allNotifications) {
      clearTimeout(this.allNotifications[timeOfDay]);
      delete this.allNotifications[timeOfDay];
    }
    localStorage.setItem(
      NotificationService.notificationStorageKey,
      JSON.stringify(Object.keys(this.allNotifications))
    );
  }

  public scheduleNewNotifcation(notif: Object, timeOfDay: number) {
    const currentDate = new Date();
    const currentTimeMin =
      currentDate.getMinutes() + currentDate.getHours() * 60;

    // Replace the old timeout with the new one
    if (timeOfDay in this.allNotifications) {
      clearTimeout(this.allNotifications[timeOfDay]);
    }

    // Calculate the time in miliseconds until the notifcation needs to be executed.
    const delayedTime =
      1000 *
      60 *
      (currentTimeMin >= timeOfDay
        ? 24 * 60 - currentTimeMin + timeOfDay
        : timeOfDay - currentTimeMin);

    this.allNotifications[timeOfDay] = setTimeout(() => {
      const n = new Notification('MoodTracker', notif);
      this.scheduleNewNotifcation(notif, timeOfDay);
    }, delayedTime);

    localStorage.setItem(
      NotificationService.notificationStorageKey,
      JSON.stringify(Object.keys(this.allNotifications))
    );
  }
}
