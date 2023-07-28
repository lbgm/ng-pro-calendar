import { Component, ElementRef, Input, OnChanges, OnInit, Signal, SimpleChanges, TemplateRef, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Appointment, Configs, E_CustomEvents } from '../../../types/main';
import { fixDateTime, hours, incrementTime, isoStringToDate, minutes, timeFormat } from '../../../common/main';
import { TranslateService } from '../../../services/translate.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: [
    '../../../tailwind.scss',
    './event.component.scss'
  ]
})
export class EventComponent implements OnInit, OnChanges {
  @Input() eventDate!: Date;
  @Input() eventTime?: string = "";
  @Input('eventCard') eventCardRef!: TemplateRef<any>;

  @ViewChild('eventContainer') eventContainer: ElementRef<HTMLElement> | undefined = undefined;
  @ViewChild('eventSide') eventSide: ElementRef<HTMLElement> | undefined = undefined;
  @ViewChild('eventList') eventList: ElementRef<HTMLElement> | undefined = undefined;

  openEventList: WritableSignal<boolean> = signal(false);
  openSingleEvent: WritableSignal<boolean> = signal(false);

  datetime_start: WritableSignal<Date | null> = signal(null);
  datetime_end: WritableSignal<Date | null> = signal(null);

  // to define popup position
  popupr: WritableSignal<boolean> = signal(false);
  popupb: WritableSignal<boolean> = signal(false);

  configs: WritableSignal<Configs> = signal({});
  calendarEvents: WritableSignal<Appointment[]> = signal([]);
  RdvsPkg: Signal<Appointment[]> = computed((): Appointment[] => {
    const _start = this.datetime_start() as Date;
    const _end = this.datetime_end() as Date;

    return this.calendarEvents().filter((rdv: Appointment) => {
      const _d = isoStringToDate(rdv.date);
      return _d >= _start && _d < _end;
    });
  });

  actionsEnabled: Signal<boolean> = computed(() => {
    const actions = ["viewEvent", "reportEvent"];
    return actions.some(
      (it: string) => (this.configs() as Record<string, any>)[it] !== undefined
    );
  });

  isoStringToDate = isoStringToDate;
  timeFormat = timeFormat;
  hours = hours;
  minutes = minutes;

  get lang(): string {
    return this.translateService.lang;
  }

  constructor(
    private storeService: StoreService,
    private translateService: TranslateService,
    private utilitiesService: UtilitiesService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    // subscribe configs
    this.storeService._configs.subscribe((value: Configs) => {
      this.configs.set(value);
    });

    //subscribe events
    this.storeService._events.subscribe((value: Appointment[]) => {
      this.calendarEvents.set(value);
    });

    // utilitiesService
    this.utilitiesService._documentClickTarget.subscribe((value: EventTarget | null) => {
      if(value) this.handleOutsideClick(value as EventTarget);
    })

    this.setDatetime();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes?.['evenDate']?.currentValue || changes?.['eventTime']?.currentValue) {
        this.setDatetime();
      }
  }

  handleOutsideClick(target: EventTarget): void {
    // popover control
    if (
      this.eventContainer?.nativeElement &&
      !(this.eventContainer?.nativeElement as HTMLElement).contains(
        target as Node | null
      )
    ) {
      this.closeEventList();
    }
  }

  closeEventList(): void {
    this.openEventList.set(false);
    // to hide single event popup
    this.openSingleEvent.set(false);
  }

  openEvtList(): void {
    const _bpos = (this.eventSide?.nativeElement as HTMLElement).getBoundingClientRect();
    const _bpar = (
      document.querySelector(
        '[data-widget-item="calendar-inside"]'
      ) as HTMLElement
    ).getBoundingClientRect();
    if (this.RdvsPkg().length > 1) this.openEventList.set(true);
    else if (this.RdvsPkg().length === 1) this.openSingleEvent.set(true);
    //set automatically popup position, right or left
    this.popupr.set(_bpar.width < _bpos.x);
    this.popupb.set(_bpos.y > _bpar.height * 0.8);
  }

  setDatetime(): void {
    // transform props binding to datetime
    this.datetime_start.set(fixDateTime(this.eventDate as Date, this.eventTime as string));
    this.datetime_end.set(fixDateTime(
      this.eventDate as Date,
      incrementTime(this.eventTime as string)
    ));
  }

  viewEvent(id: string | number | unknown): void {
    const event = new CustomEvent(E_CustomEvents.VIEW, {
      detail: { id },
    });
    document.body.dispatchEvent(event);
    this.closeEventList();
  };

  reportEventFor(id: string | number | unknown): void {
    const event = new CustomEvent(E_CustomEvents.REPORT, {
      detail: { id },
    });
    document.body.dispatchEvent(event);
    this.closeEventList();
  }

  trackRdv(index: number, rdv: Appointment): number {
    return index;
  }
}
