import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNativeDatepickerComponent } from './calendar-native-datepicker.component';

describe('CalendarNativeDatepickerComponent', () => {
  let component: CalendarNativeDatepickerComponent;
  let fixture: ComponentFixture<CalendarNativeDatepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarNativeDatepickerComponent]
    });
    fixture = TestBed.createComponent(CalendarNativeDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
