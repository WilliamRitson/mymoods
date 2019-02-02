import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodLineChartComponent } from './mood-line-chart.component';

describe('MoodLineChartComponent', () => {
  let component: MoodLineChartComponent;
  let fixture: ComponentFixture<MoodLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
