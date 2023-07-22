import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekViewComponent } from './week-view.component';

describe('WeekViewComponent', () => {
  let component: WeekViewComponent;
  let fixture: ComponentFixture<WeekViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekViewComponent]
    });
    fixture = TestBed.createComponent(WeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
