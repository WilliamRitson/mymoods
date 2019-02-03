import { Component, OnInit, ViewChild } from '@angular/core';
import { MoodStorageService, MoodValue } from '../mood-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mood-entry',
  templateUrl: './mood-entry.component.html',
  styleUrls: ['./mood-entry.component.scss']
})
export class MoodEntryComponent {
  @ViewChild('keywordsInputField') keywordsInputField;

  constructor(private moodStorage: MoodStorageService, private router: Router) {}

  public currentMood: string;
  public moods: string[] = ['\ud83d\ude22 Very Bad', '\ud83d\ude41 Bad', '\ud83d\ude10 Neutral', '\ud83d\ude42 Good', '\ud83d\ude00 Very Good'];

  public entryDone() {
    console.log(this.currentMood);
    console.log(this.keywordsInputField);

    const splitKeywords = this.keywordsInputField.nativeElement.value
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 0);

    this.moodStorage.addMoodValue(this.moodStingToEnum(this.currentMood), splitKeywords);
    this.router.navigateByUrl('/');
  }

  private moodStingToEnum(string: String): MoodValue {
    switch (string) {
      case this.moods[0]:
        return MoodValue.VeryBad;
      case this.moods[1]:
        return MoodValue.Bad;
      case this.moods[2]:
        return MoodValue.Neutral;
      case this.moods[3]:
        return MoodValue.Good;
      case this.moods[4]:
        return MoodValue.VeryGood;
    }
  }
}
