import { Component, OnInit } from '@angular/core';
import {
  MoodStorageService,
  MoodValue,
  MoodRecord
} from '../mood-storage.service';

@Component({
  selector: 'app-mood-heatmap-chart',
  templateUrl: './mood-heatmap-chart.component.html',
  styleUrls: ['./mood-heatmap-chart.component.scss']
})

export class MoodHeatmapChartComponent implements OnInit {
  public lastMoods: MoodRecord[] = [];

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

  ngOnInit() {}

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
