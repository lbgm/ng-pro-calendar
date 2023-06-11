import { TestBed } from '@angular/core/testing';

import { ProCalendarService } from './pro-calendar.service';

describe('ProCalendarService', () => {
  let service: ProCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
