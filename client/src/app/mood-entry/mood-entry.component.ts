import { Component, OnInit } from '@angular/core';
import { MoodStorageService, MoodValue } from '../mood-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mood-entry',
  templateUrl: './mood-entry.component.html',
  styleUrls: ['./mood-entry.component.scss']
})
export class MoodEntryComponent {
  constructor(private moodStorage: MoodStorageService, private router: Router) {}

  public currentMood: string;
  public moods: string[] = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'];

  public entryDone() {
    this.moodStorage.addMoodValue(this.moodStingToEnum(this.currentMood));
    alert('Thanks!');
    this.router.navigateByUrl('/');

  }

  private moodStingToEnum(string: String): MoodValue {
    switch (string) {
      case 'Very Bad':
        return MoodValue.VeryBad;
      case 'Bad':
        return MoodValue.Bad;
      case 'Neutral':
        return MoodValue.Neutral;
      case 'Good':
        return MoodValue.Good;
      case 'Very Good':
        return MoodValue.VeryGood;
    }
  }
}
