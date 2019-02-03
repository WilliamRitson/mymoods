import { Component, OnInit, ViewChild } from '@angular/core';
import { MoodStorageService } from '../mood-storage.service';
import * as FileSaver from 'file-saver';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public existingNotifications: Array<number>;
  @ViewChild('notificationsList') notificationsList;
  @ViewChild('newNotificationTimeInput') newNotificationTimeInput;

  constructor(private moodStorage: MoodStorageService, private notificationService: NotificationService) {
    this.existingNotifications = notificationService.getScheduledNotifications();
  }

  ngOnInit() {}

  public exportAsJson() {
    const data = JSON.stringify(this.moodStorage.getMoodValues());
    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    FileSaver.saveAs(blob, 'data.json');
  }

  public exportAsCSV() {
    const data = `time, mood
      ${this.moodStorage
        .getMoodValues()
        .map(moodValue => moodValue.time + ', ' + moodValue.mood)
        .join('\n')}`;
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'data.csv');
  }

  public importJSON(event: any): void {
    this.loadTextFile(event)
      .then(data => {
        const parsed = JSON.parse(data);
        if (parsed) {
          this.moodStorage.overwriteMoodRecords(parsed);
        }
      })
      .catch(() => null);
  }

  public importCSV(event: any): void {
    this.loadTextFile(event)
      .then(data => {
        const rows = data.split('\n').map(row => row.split(/,\s*/));
        const header = rows[0];
        const body = rows.slice(1);
        this.moodStorage.overwriteMoodRecords(body.map(row => {
          return {
            time: new Date(row[0]),
            mood: parseInt(row[1], 10)
          };
        }));

      })
      .catch(() => null);
  }

  private loadTextFile(event: any): Promise<string> {
    const files: FileList = event.target.files;
    const dataFile = files.item(0);
    if (dataFile === null) {
      return Promise.reject();
    }
    const reader = new FileReader();
    const promise = new Promise<string>(resolve => {
      reader.onload = (e: any) => {
        resolve(e.target.result as string);
      };
    });
    reader.readAsText(dataFile);
    return promise;
  }

  public removeNotifications() {
    this.notificationsList.selectedOptions.selected.forEach(selectedItem => {
      this.notificationService.removeScheduledNotification(parseInt(selectedItem._element.nativeElement.id, 10));
    });
    this.existingNotifications = this.notificationService.getScheduledNotifications();
  }

  public addNotification() {
    const timeRegEx = /^\s*(\d{1,2})\s*:\s*(\d{2})\s*$/;

    const stringValue = this.newNotificationTimeInput.nativeElement.value;
    const matching = stringValue.match(timeRegEx);

    if (matching) {
      const hours = parseInt(matching[1], 10);
      const minutes = parseInt(matching[2], 10);
      if (hours < 24 && hours >= 0 && minutes < 60 && minutes >= 0) {
        this.notificationService.scheduleNewNotifcation(
          { body: 'Time to enter your current mood!' },
          60 * hours + minutes
        );
        this.existingNotifications = this.notificationService.getScheduledNotifications();
      }
    }
  }
}
