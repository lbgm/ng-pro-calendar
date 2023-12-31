import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { dateLabel } from '../../../common/main';
import { TrPipe } from '../../../pipes/tr.pipe';

type CalendarDateInput = HTMLInputElement & {
  showPicker(): void;
};

@Component({
  selector: 'native-datepicker',
  templateUrl: './calendar-native-datepicker.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './calendar-native-datepicker.component.scss'
  ],
  providers: [
    TrPipe
  ]
})
export class CalendarNativeDatepickerComponent implements OnInit, OnChanges {
  @Input() value?: Date = new Date();

  @Output() changed: EventEmitter<Date> = new EventEmitter<Date>(true);

  @ViewChild('dateinput') dateinput: ElementRef<HTMLInputElement> | undefined;

  selectedDate: string = this.dateToString(this.value as Date);

  get displayDate (): string {
    const _nd = new Date(this.selectedDate);
  
    return /calendar/i.test(dateLabel(_nd))
      ? this.trPipe.transform(dateLabel(_nd).split('.')[1])
      : dateLabel(_nd);
  }

  constructor(private trPipe: TrPipe) { }

  ngOnInit(): void {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.dateinput?.nativeElement.addEventListener("click", (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        (event.target as CalendarDateInput).showPicker();
      });
    } else
      console.error("HTMLInputElement.prototype: `showPicker` not supported");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['value']?.currentValue) {
      this.selectedDate = this.dateToString(changes['value'].currentValue as unknown as Date);
    }
  }


  dateToString (date: Date): string {
    return date.toISOString().split("T")[0];
  }

  emitDate (event: Event): void {
    void event;
    if (!this.selectedDate) this.selectedDate = this.dateToString(new Date());
    //
    this.changed.emit(new Date(this.selectedDate));
  }
}
