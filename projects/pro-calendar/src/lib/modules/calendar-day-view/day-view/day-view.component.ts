import { Component, Input, OnChanges, SimpleChanges, WritableSignal, signal } from '@angular/core';
import {
  twoDigitTime, 
  incrementTime,
  fixDateTime,
  randomId,
  dayName,
  copyDate,
  timeFormat,
} from '../../../common/main';

@Component({
  selector: 'day-view',
  templateUrl: './day-view.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './day-view.component.scss'
  ]
})
export class DayViewComponent implements OnChanges {
  @Input() dateSelected?: string | Date;
  @Input() dayTimes?: string[] = [];

  inDateView: WritableSignal<Date> = signal(this.dateSelected as Date);

  twoDigitTime = twoDigitTime;
  incrementTime = incrementTime;
  fixDateTime = fixDateTime;
  randomId = randomId;
  dayName = dayName;
  copyDate = copyDate;
  timeFormat = timeFormat;

  ngOnChanges(changes: SimpleChanges): void {
      if (this.dateSelected) this.inDateView.set(this.dateSelected as Date);
  }

  trackDayTimes(index: number, time: string): number {
    return index;
  }

  trackDayView(index: number, date: Date): number {
    return index + date.getTime();
  }
}
