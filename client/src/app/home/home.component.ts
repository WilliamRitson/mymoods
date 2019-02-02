import { Component, OnInit } from '@angular/core';
import {
  MoodStorageService,
  MoodRecord,
  MoodValue
} from '../mood-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lastMoods: MoodRecord[] = [];

  public lineChartData: {
    name: string;
    series: { name: string; value: any }[];
  }[];

  public pieChartData: {
    name: string;
    value: number;
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

    const moodSums: number[] = new Array(5).fill(0);
    for (const mood of this.lastMoods) {
      moodSums[mood.mood]++;
    }

    this.pieChartData = moodSums.map((sum, index) => {
      return {
        name: this.moodEnumToString(index),
        value: sum
      };
    });
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
