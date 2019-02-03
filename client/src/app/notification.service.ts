import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private allNotifications: Object;

  private static notificationStorageKey = 'notification-settings';

  constructor() {
    this.allNotifications = {};

    const notificationSettings = localStorage.getItem(NotificationService.notificationStorageKey);
    
    // If stored, then permission already acquired
    if (notificationSettings) {
      const parsedSettings = JSON.parse(notificationSettings);

      parsedSettings.forEach(timeOfDay => {
        this.scheduleNewNotifcation(
          { body: 'Time to enter your current mood!' },
          parseInt(timeOfDay));
      });
    } else {
      Notification.requestPermission(status => {
        if (status === 'granted') {
          // Insert empty data into the local storage to indicate that notif has permission
          localStorage.setItem(NotificationService.notificationStorageKey, '[]');
        }
      });
    }
  }

  public isGranted() {
    return Notification.permission === 'granted';
  }

  public getScheduledNotifications() : Array<number> {
    let timeStamps = [];
    Object.keys(this.allNotifications).forEach(element => {
      timeStamps.push(parseInt(element));
    });
    return timeStamps;
  }

  public removeScheduledNotification(timeOfDay: number) {
    if (timeOfDay in this.allNotifications) {
      clearTimeout(this.allNotifications[timeOfDay]);
      delete this.allNotifications[timeOfDay];
    }
    localStorage.setItem(NotificationService.notificationStorageKey, JSON.stringify(Object.keys(this.allNotifications)));
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
      1000 * 60 *
      (currentTimeMin >= timeOfDay
        ? 24 * 60 - currentTimeMin + timeOfDay
        : timeOfDay - currentTimeMin);

    this.allNotifications[timeOfDay] = setTimeout(() => {
      const n = new Notification('MoodTracker', notif);
      this.scheduleNewNotifcation(notif, timeOfDay);
    }, delayedTime);

    localStorage.setItem(NotificationService.notificationStorageKey, JSON.stringify(Object.keys(this.allNotifications)));
  }
}
