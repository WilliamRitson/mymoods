import { Injectable } from '@angular/core';

export enum MoodValue {
  VeryBad,
  Bad,
  Neutral,
  Good,
  VeryGood
}

export interface MoodRecord {
  time: Date;
  mood: MoodValue;
}

@Injectable({
  providedIn: 'root'
})
export class MoodStorageService {
  private static localStorageName = 'mood-storage';

  private moodValues: MoodRecord[];

  constructor() {
    this.moodValues = this.loadMoodValues();
  }

  public addMoodValue(newValue: MoodValue) {
    this.moodValues.push({
      time: new Date(),
      mood: newValue
    });
    this.storeMoodValues();
  }

  public getMoodValues(): MoodRecord[] {
    return [...this.moodValues];
  }

  private loadMoodValues(): MoodRecord[] {
    const data = localStorage.getItem(MoodStorageService.localStorageName);
    if (!data) {
      return [];
    }
    return JSON.parse(data, (key, value) => {
      if (key === 'time') {
        return new Date(value);
      }
      return value;
    });
  }

  private storeMoodValues() {
    localStorage.setItem(MoodStorageService.localStorageName, JSON.stringify(this.moodValues));
  }


}
