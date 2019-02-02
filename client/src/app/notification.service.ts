import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private allNotifications : Object;

  constructor() { 
    Notification.requestPermission();
    this.allNotifications = {};
  }

  public isGranted() {
    return Notification.permission === 'granted';
  }

  public scheduleNewNotifcation(notif : Object, timeOfDay : number) {
    const currentDate = new Date();
    const currentTimeMin = currentDate.getMinutes() + currentDate.getHours() * 60;

    // Replace the old timeout with the new one
    if (timeOfDay in this.allNotifications) {
      clearTimeout(this.allNotifications[timeOfDay]);
    }
    
    // Calculate the time in miliseconds until the notifcation needs to be executed.
    const delayedTime = 1000 * ((currentTimeMin >= timeOfDay) ? (24 * 60 - currentTimeMin + timeOfDay) : (timeOfDay - currentTimeMin));

    console.log(delayedTime);
    

    this.allNotifications[timeOfDay] = setInterval( () => {
      const n = new Notification('MoodTracker', notif);
    }, 24 * 60 * 1000);
  }
}
