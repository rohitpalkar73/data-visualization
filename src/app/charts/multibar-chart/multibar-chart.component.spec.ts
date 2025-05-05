import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultibarChartComponent } from './multibar-chart.component';

describe('MultibarChartComponent', () => {
  let component: MultibarChartComponent;
  let fixture: ComponentFixture<MultibarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultibarChartComponent]
    });
    fixture = TestBed.createComponent(MultibarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
