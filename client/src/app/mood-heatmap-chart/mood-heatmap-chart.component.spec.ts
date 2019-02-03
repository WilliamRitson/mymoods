import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodHeatmapChartComponent } from './mood-heatmap-chart.component';

describe('MoodHeatmapChartComponent', () => {
  let component: MoodHeatmapChartComponent;
  let fixture: ComponentFixture<MoodHeatmapChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodHeatmapChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodHeatmapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
