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

  constructor(private moodStorage: MoodStorageService) {
    this.lastMoods = moodStorage.getMoodValues();
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
