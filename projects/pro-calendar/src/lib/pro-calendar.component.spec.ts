import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCalendarComponent } from './pro-calendar.component';

describe('ProCalendarComponent', () => {
  let component: ProCalendarComponent;
  let fixture: ComponentFixture<ProCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProCalendarComponent]
    });
    fixture = TestBed.createComponent(ProCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
