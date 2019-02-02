import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodPieChartComponent } from './mood-pie-chart.component';

describe('MoodPieChartComponent', () => {
  let component: MoodPieChartComponent;
  let fixture: ComponentFixture<MoodPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
