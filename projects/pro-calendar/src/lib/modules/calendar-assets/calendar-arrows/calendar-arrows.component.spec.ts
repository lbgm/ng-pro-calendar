import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarArrowsComponent } from './calendar-arrows.component';

describe('CalendarArrowsComponent', () => {
  let component: CalendarArrowsComponent;
  let fixture: ComponentFixture<CalendarArrowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarArrowsComponent]
    });
    fixture = TestBed.createComponent(CalendarArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
