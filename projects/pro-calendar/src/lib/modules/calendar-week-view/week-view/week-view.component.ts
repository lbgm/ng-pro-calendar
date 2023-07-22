import { Component, Input, TemplateRef } from '@angular/core';
import { dayName, timeFormat } from '../../../common/main';

@Component({
  selector: 'week-view',
  templateUrl: './week-view.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './week-view.component.scss'
  ]
})
export class WeekViewComponent {
  @Input() dayTimes: string[] = [];
  @Input() weekDays: Date[] = [];
  @Input() dateSelected!: Date;
  @Input('eventCard') eventCardRef!: TemplateRef<any>;

  dayName = dayName;
  timeFormat = timeFormat;

  trackWeekDays(index: number, weekDay: Date): number {
    return index + weekDay.getTime();
  }

  trackDayTimes(index: number, time: string): number {
    return index;
  }
}
