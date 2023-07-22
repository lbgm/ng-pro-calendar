import { Component, Input, TemplateRef } from '@angular/core';
import { dayName } from '../../../common/main';

@Component({
  selector: 'month-view',
  templateUrl: './month-view.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './month-view.component.scss'
  ]
})
export class MonthViewComponent {
  @Input() monthDays: Date[] = [];
  @Input() weekDays: Date[] = [];
  @Input() dateSelected!: Date;
  @Input('eventCard') eventCardRef!: TemplateRef<any>;

  dayName = dayName;

  get rows(): number[] {
    return [...Array.from({ length: Math.ceil(this.monthDays.length / 7) }, (_, i) => i + 1)];
  }

  rowDays(rowIndex: number, row: number): Date[] {
    return [...this.monthDays].slice(rowIndex * 7, row * 7);
  }

  trackWeekDayDate(index: number, weekDay: Date): number {
    return index + weekDay.getTime();
  }

  trackMonthRows(index: number, monthRow: number): number {
    return index + monthRow;
  }

  trackMonthDayDate(index: number, monthDay: Date): number {
    return index + monthDay.getTime();
  }
}
