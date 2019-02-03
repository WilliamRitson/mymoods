import { Component, OnInit } from '@angular/core';
import { MoodStorageService, MoodRecord, MoodValue } from '../mood-storage.service';

@Component({
  selector: 'app-mood-pie-chart',
  templateUrl: './mood-pie-chart.component.html',
  styleUrls: ['./mood-pie-chart.component.scss']
})
export class MoodPieChartComponent implements OnInit {
  public lastMoods: MoodRecord[] = [];
  public view: number[];

  public pieChartData: {
    name: string;
    value: number;
  }[];

  constructor(private moodStorage: MoodStorageService) {
    this.lastMoods = moodStorage.getMoodValues();

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

  ngOnInit() {
    this.view = [window.innerWidth / 1.35, 375];
  }

  onResize(event) {
    this.view = [event.target.innerWidth / 1.35, 375];
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
