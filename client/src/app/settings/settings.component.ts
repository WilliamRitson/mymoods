import { Component, OnInit } from '@angular/core';
import { MoodStorageService } from '../mood-storage.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private moodStorage: MoodStorageService) {}

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
}
