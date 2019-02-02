import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mood-entry',
  templateUrl: './mood-entry.component.html',
  styleUrls: ['./mood-entry.component.scss']
})
export class MoodEntryComponent implements OnInit {

  constructor() { }

  mood: string;
  moods: string[] = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'];

  ngOnInit() {
  }

}
