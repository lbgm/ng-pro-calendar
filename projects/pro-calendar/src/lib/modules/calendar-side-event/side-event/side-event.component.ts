import { Component, ElementRef, Input, OnChanges, OnInit, Signal, SimpleChanges, ViewChild, WritableSignal, computed, effect, signal } from '@angular/core';
import { Appointment, E_CustomEvents } from '../../../types/main';
import { StoreService } from '../../../services/store.service';
import { TranslateService } from '../../../services/translate.service';
import { UtilitiesService } from '../../../services/utilities.service';
import { dateLabel, fixDateTime, hours, incrementTime, isoStringToDate, minutes, timeFormat } from '../../../common/main';
import { TrPipe } from '../../../pipes/tr.pipe';

@Component({
  selector: 'side-event',
  templateUrl: './side-event.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './side-event.component.scss'
  ],
  providers: [
    TrPipe
  ]
})
export class SideEventComponent implements OnInit, OnChanges {
  @Input() eventDate!: Date;

  @ViewChild('eventContainer') eventContainer: ElementRef<HTMLElement> | undefined = undefined;

  datetime_start: WritableSignal<Date | null> = signal(null);
  datetime_end: WritableSignal<Date | null> = signal(null);

  calendarEvents: WritableSignal<Appointment[]> = signal([]);
  RdvsPkg: Signal<Appointment[]> = computed((): Appointment[] => {
    const start = this.datetime_start() as Date;
    const end = this.datetime_end() as Date;

    return this.calendarEvents().filter((rdv: Appointment) => {
      const d = isoStringToDate(rdv.date);
      return d >= start && d < end;
    });
  });

  timeFormat = timeFormat;
  hours = hours;
  minutes = minutes;

  constructor(
    private storeService: StoreService,
    private translateService: TranslateService,
    private utilitiesService: UtilitiesService,
    private el: ElementRef,
    private trPipe: TrPipe
  ) { }

  get displayDate(): string {
    return /calendar/i.test(dateLabel(this.eventDate))
      ? this.trPipe.transform(`${dateLabel(this.eventDate)}`)
      : dateLabel(this.eventDate)
  }

  get lang(): string {
    return this.translateService.lang;
  }

  ngOnInit(): void {
    //subscribe events
    this.storeService._events.subscribe((value: Appointment[]) => {
      this.calendarEvents.set(value);
    });

    this.setDatetime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['eventDate']?.currentValue) {
      this.setDatetime();
    }
  }

  setDatetime(): void {
    // transform props binding to datetime
    this.datetime_start.set(fixDateTime(this.eventDate as Date, ""));
    this.datetime_end.set(fixDateTime(this.eventDate as Date, incrementTime("")));
  }

  viewEvent(id: string | number | unknown): void {
    const event = new CustomEvent(E_CustomEvents.VIEW, {
      detail: { id },
    });
    document.body.dispatchEvent(event);
  }

  trackRdv(index: number, rdv: Appointment): number {
    return index;
  }

}
