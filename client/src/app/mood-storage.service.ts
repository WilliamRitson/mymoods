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
  private static localMoodStorageName = 'mood-storage';
  private static localKeywordStorageName = 'keyword-storage';

  private moodValues: MoodRecord[];
  private keywordValues: Object;

  constructor() {
    this.moodValues = this.loadMoodValues();
    this.keywordValues = this.loadKeywordValues();
  }

  public addMoodValue(newValue: MoodValue, keywords: string[]) {
    this.moodValues.push({
      time: new Date(),
      mood: newValue
    });
    keywords.forEach(word => {
      let moodValuesForWord = this.keywordValues[word];
      if (!(moodValuesForWord)) {
        moodValuesForWord = [];
        this.keywordValues[word] = moodValuesForWord;
      }
      moodValuesForWord.push(newValue);
    });
    this.storeKeywordValues();
    this.storeMoodValues();
  }

  public overwriteMoodRecords(newRecords: MoodRecord[]) {
    this.moodValues = newRecords;
    this.storeMoodValues();
  }

  public overwriteKeywordRecords(newRecords: Object) {
    this.keywordValues = newRecords;
    this.storeKeywordValues();
  }

  public getMoodValues(): MoodRecord[] {
    return [...this.moodValues];
  }

  public getKeywordValues(): Object {
    return {...this.keywordValues};
  }

  private loadKeywordValues(): Object {
    const data = localStorage.getItem(MoodStorageService.localKeywordStorageName);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  }

  private loadMoodValues(): MoodRecord[] {
    const data = localStorage.getItem(MoodStorageService.localMoodStorageName);
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
    localStorage.setItem(MoodStorageService.localMoodStorageName, JSON.stringify(this.moodValues));
  }

  private storeKeywordValues() {
    localStorage.setItem(MoodStorageService.localKeywordStorageName, JSON.stringify(this.keywordValues));
  }

}
