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
    const data = `Date, Mood
      ${this.moodStorage.getMoodValues().map(moodValue => moodValue.time + ', ' + moodValue.mood).join('\n')}`;
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'data.csv');
  }
}
