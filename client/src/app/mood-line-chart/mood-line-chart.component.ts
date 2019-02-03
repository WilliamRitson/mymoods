import { Component, OnInit } from '@angular/core';
import {
  MoodStorageService,
  MoodValue,
  MoodRecord
} from '../mood-storage.service';

@Component({
  selector: 'app-mood-line-chart',
  templateUrl: './mood-line-chart.component.html',
  styleUrls: ['./mood-line-chart.component.scss']
})
export class MoodLineChartComponent implements OnInit {
  public lastMoods: MoodRecord[] = [];
  public view: number[];

  public lineChartData: {
    name: string;
    series: { name: string; value: any }[];
  }[];

  constructor(private moodStorage: MoodStorageService) {
    this.lastMoods = moodStorage.getMoodValues();
    this.lineChartData = [
      {
        name: 'My Mood',
        series: this.lastMoods.map(moodRecord => {
          return {
            name: moodRecord.time.toString(),
            value: moodRecord.mood
          };
        })
      }
    ];
  }

  ngOnInit() {
    this.view = [window.innerWidth / 1.1, 350];
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.1, 350];
  }

  public moodEnumToString(string: MoodValue): string {
    switch (string) {
      case MoodValue.VeryBad:
        return 'Very Bad';
      case MoodValue.Bad:
        return 'Bad';
      case MoodValue.Neutral:
        return 'Neutral';
      case MoodValue.Good:
        return 'Good';
      case MoodValue.VeryGood:
        return 'Very Good';
    }
  }
}
